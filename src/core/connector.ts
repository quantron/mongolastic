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
import {MongoError} from 'mongodb';
import {Config, Mapping} from './buildConfig';
import MongoManager from './mongoManager';
import ElasticManager from './elasticManager';
import CollectionWatcher from './collectionWatcher';
import logger from '../b12/logger';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface Container {
    config: Config;
    mongo: MongoManager;
    elastic: ElasticManager;
    collectionWatchers?: CollectionWatcher[];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type ClassModifier = () => void | Promise<unknown>;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * Control flow class
 * Manipulates collectionWatchers
 * Handles mongo connection
 */
class Connector {
    protected config: Config;

    /*
     * operations to run on start()
     * under hood they mutate this
     * we need them to build fluent interface with async operations
     */
    protected classModifiers: ClassModifier[];

    protected mongo: MongoManager;

    protected elastic: ElasticManager;

    public collectionWatchers?: CollectionWatcher[];

    constructor({mongo, elastic, config, collectionWatchers}: Container, classModifiers?: ClassModifier[]) {
        this.config = config;
        this.elastic = elastic;
        this.mongo = mongo;
        this.classModifiers = classModifiers || [];
        this.collectionWatchers = collectionWatchers;
    }

    /*
     * run all operations that mutate this
     */
    public async start(): Promise<this> {
        await bluebird.each(this.classModifiers, operation => operation());
        return this;
    }

    /*
     * write all resumeTokens to database
     * so we can keep info on where we stopped watching
     */
    public async stop(): Promise<this> {
        clearInterval(this.elastic.interval);
        if(!this.mongo.client.isConnected()) return this;
        const removeChangeStreams = _.invokeMap(
            this.collectionWatchers,
            'removeChangeStream'
        );
        await Promise.all(removeChangeStreams);
        await this.mongo.disconnect();
        return this;
    }

    /*
     * save progress on mongo connection timeout
     */
    private onTimeout = (error: MongoError): void => {
        logger.error(`Connector.onTimeout(): ${error.toString()}`);
        void this.stop();
    };

    /*
     * initiate watching on mongo reconnect
     */
    private onReconnect = (): void => {
        logger.info('Connector.onReconnect(): connection with mongo is reestablished');
        const restartWatchingPromise = _.map(this.collectionWatchers, async watcher => {
            await watcher.resumeToken?.read();
            await watcher.restartWatching({ignoreResumeToken: false});
        });
        void Promise.all(restartWatchingPromise);
    };

    /*
     * connect
     * create empty collection to avoid error for watching on nonexistent database
     * listen to specific events
     */
    public openMongoConnection(): Connector {
        const operation = async(): Promise<void> => {
            await this.mongo.connect();
            await this.mongo.createEmptyCollection();
            this.mongo.setupEventListeners();
            logger.verbose('Connector: connected to mongo');
        };
        this.classModifiers.push(operation);
        return this;
    }

    public setupDatabaseListeners(): Connector {
        const operation = (): void => {
            this
                .mongo
                .on('timeout', this.onTimeout)
                .on('reconnect', this.onReconnect);
        };
        this.classModifiers.push(operation);
        return this;
    }

    private buildOneWatcher = async(mapping: Mapping, collectionName: string): Promise<CollectionWatcher> => {
        const watcherContainer = {
            collectionName,
            mongo: this.mongo,
            elastic: this.elastic,
            mapping,
            indexName: `${this.config.elasticNamespace}.${collectionName}`
        };
        const watcher = await (new CollectionWatcher(watcherContainer))
            .buildToken(this.config.resumeTokenCollection)
            .createElasticIndex()
            .watch();
        logger.verbose(`Connector.buildOneWatcher(): started watcher with conf ${JSON.stringify({collectionName, indexName: watcherContainer.indexName, mapping})}`);
        return watcher;
    };

    public buildCollectionWatchers(): Connector {
        const {mappings} = this.config;

        const operation = async() => {
            const watcherBuildingPromises = _.map(mappings, this.buildOneWatcher);
            this.collectionWatchers = await Promise.all(watcherBuildingPromises);
        };

        this.classModifiers.push(operation);
        return this;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default Connector;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
