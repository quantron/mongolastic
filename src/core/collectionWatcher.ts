////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (C) 2008 Quantron Systems LLC.
//  All Rights Reserved.
//
//  This file is part of the Private project.
//  For conditions of distribution and use,
//  please contact sales@quantron-systems.com
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import _ from 'lodash';
import bluebird from 'bluebird';
import {Collection, ChangeStream, ObjectId, ChangeEvent, MongoError} from 'mongodb';
import logger from '../b12/logger';
import ResumeTokenManager from './resumeToken';
import {Mapping} from './buildConfig';
import ElasticManager from './elasticManager';
import MongoConnector from './mongoManager';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface Container {
    mapping: Mapping;
    collectionName: string;
    elastic: ElasticManager;
    collection?: Collection;
    mongo: MongoConnector;
    resumeToken?: ResumeTokenManager;
    indexName: string;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type DefaultMongoDoc = {
    _id: ObjectId;
    [key: string]: unknown;
};

type DefaultElasticDoc = {
    _id: string;
    [key: string]: unknown;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type ClassModifier = () => void | Promise<unknown>;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class CollectionWatcher {
    protected classModifiers: ClassModifier[];

    readonly elastic: ElasticManager;

    readonly indexName: string;

    readonly mapping: Mapping;

    readonly collectionName: string;

    readonly mongo: MongoConnector;

    readonly collection: Collection;

    public resumeToken?: ResumeTokenManager;

    protected changeStream?: ChangeStream<DefaultMongoDoc>;

    readonly transform: (
        inputDoc: DefaultMongoDoc,
        collection: Collection,
        callback: (error: Error | null, elasticDoc: DefaultElasticDoc) => void
    ) => void;

    constructor(
        {mapping, collectionName, collection, elastic, mongo, resumeToken, indexName}: Container,
        classModifiers?: ClassModifier[]
    ) {
        this.collection = collection || mongo.db.collection(collectionName);
        this.collectionName = collectionName;
        this.mongo = mongo;
        this.mapping = mapping;
        this.elastic = elastic;
        this.resumeToken = resumeToken;
        this.classModifiers = classModifiers || [];
        this.indexName = indexName;
        this.transform = mapping.transformFunc;
    }

    private onChange = (change: ChangeEvent<DefaultMongoDoc>): void => {
        switch(change.operationType) {
            case 'invalidate': {
                logger.info(`${this.collectionName} invalidate`);
                void this.restartWatching({ignoreResumeToken: true});
                return;
            }
            case 'drop':
            case 'dropDatabase':
            case 'rename':
                logger.info(`CollectionWatcher(${this.collectionName}) event - ${JSON.stringify(change)}`);
                return;
            case 'delete': {
                const {
                    _id: resumeToken,
                    documentKey: {_id}
                } = change;

                if(resumeToken) this.resumeToken?.setToken(resumeToken);

                logger.info(`CollectionWatcher(${this.collectionName}).on(delete)`);

                void this.elastic.deleteDoc({_id: _id.toHexString(), indexName: this.indexName});

                return;
            }
            case 'replace':
            case 'insert':
            case 'update': {
                const {
                    _id: resumeToken,
                    fullDocument,
                    documentKey: {_id},
                    operationType
                } = change;

                if(!fullDocument) {
                    logger.error(`CollectionWatcher(${this.collectionName}).on(update): found no fullDocument ${JSON.stringify(change, null, 2)}`);
                    break;
                }

                logger.info(`CollectionWatcher(${this.collectionName}).on(${operationType}) - ${JSON.stringify({_id, operationType}, null, 2)}`);

                this.transform(fullDocument, this.collection, (error, elasticDoc) => {
                    if(error) {
                        logger.error(
                            `CollectionWatcher(${
                                this.collectionName
                            }).on(${operationType}) error transforming doc - ${error.toString()}`
                        );
                    } else {
                        const {versionField} = this.mapping;

                        if(resumeToken) this.resumeToken?.setToken(resumeToken);

                        this.elastic.insertDoc({
                            indexName: this.indexName,
                            _id: _id.toString(),
                            dateString: elasticDoc[versionField] as string,
                            doc: elasticDoc
                        });
                    }
                });
                break;
            }
            default: {
                logger.warn(`CollectionWatcher.${this.collectionName} unknown event - ${JSON.stringify(change)}`);
            }
        }
    };

    private onClose = (): void => {
        logger.info(`the changeStream for ${this.collectionName} has closed`);
    };

    private onError = (error: MongoError) => {
        logger.error(`${this.collectionName} changeStream error:`, error);
        // 40585: resume of change stream was not possible, as the resume token was not found

        if(error.code === 40585 || error.code === 40615) {
            void this.restartWatching({ignoreResumeToken: true});
        } else {
            void this.restartWatching({ignoreResumeToken: false});
        }
    };

    public async restartWatching({ignoreResumeToken}: {ignoreResumeToken: boolean}): Promise<this> {
        await this.removeChangeStream();
        if(ignoreResumeToken) await this.resumeToken?.reset();
        this.classModifiers = [];
        return this.watch();
    }

    public async removeChangeStream(): Promise<void> {
        const listeners = this.changeStream?.eventNames();
        _.forEach(listeners, (listener) => {
            this.changeStream?.removeAllListeners(listener);
        });
        delete this.changeStream;
        await this.resumeToken?.upsertIfExists();
    }

    public buildToken(resumeTokenCollectionName: string): CollectionWatcher {
        const operation = (): void => {
            this.resumeToken = new ResumeTokenManager({
                collectionName: this.collectionName,
                storageCollection: this.mongo.db.collection(resumeTokenCollectionName)
            });
        };
        this.classModifiers.push(operation);
        return this;
    }

    public createElasticIndex(): CollectionWatcher {
        const operation = () => {
            const {elastic, indexName, mapping} = this;
            return elastic.createIndexIfNotExists(indexName, mapping);
        };
        this.classModifiers.push(operation);
        return this;
    }

    // these are overloads
    async watch(): Promise<this>;

    async watch({ignoreResumeToken}: {ignoreResumeToken: boolean}): Promise<this>;

    public async watch({ignoreResumeToken = false} = {}): Promise<this> {
        logger.info(`new watcher for collection ${this.collectionName}`);
        if(ignoreResumeToken) {
            await this.resumeToken?.reset();
        }
        await bluebird.each(this.classModifiers, (operation) => operation());

        const token = await this.resumeToken?.read();

        this.changeStream = this.collection
            .watch({resumeAfter: token, fullDocument: 'updateLookup'})
            .on('change', this.onChange)
            .on('close', this.onClose)
            .on('error', this.onError);

        return this;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default CollectionWatcher;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
