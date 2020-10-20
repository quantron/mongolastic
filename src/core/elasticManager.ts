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
import {ClientOptions, Client} from '@elastic/elasticsearch';
import logger from '../b12/logger';
import * as versioning from './versioning';
import {Mapping} from './buildConfig';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface ElasticSettings {
    bulkSize: number;
    elasticNamespace: string;
    elasticClientOpts: ClientOptions;
    elasticRotationIntervalMs: number;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type MetaInfoOperation = {
    index: {
        _index: string;
        _id: string;
        _parent: string;
        _versionType: string;
        _version: number;
    };
};

type DocOperation = Record<string, unknown>;

type Operation = MetaInfoOperation | DocOperation;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface MongoUpdateParams {
    indexName: string;
    _id: string;
    dateString: string;
    doc: {[key: string]: unknown; _id: string};
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface MongoDeleteParams {
    indexName: string;
    _id: string;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type ErroredDocument = {
    status: number;
    error?: {
        type: string;
        reason: string;
        index_uuid: string;
        shard: string;
        index: string;
    };
    operation: MetaInfoOperation;
    document: DocOperation;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type BulkResponseItemOp = 'create' | 'delete' | 'index' | 'update';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type BulkResponseItem = {
    [operation in BulkResponseItemOp]: {
        _index: string;
        _type: string;
        _id: string;
        _version?: string;
        _result: string;
        _shards?: {
            total: number;
            successful: number;
            failed: number;
        };
        _seq_no: number;
        _primary_term: number;
        status: number;
        error?: {
            type: string;
            reason: string;
            index_uuid: string;
            shard: string;
            index: string;
        };
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface BulkResponse {
    tool: number;
    errors: boolean;
    items: BulkResponseItem[];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface GetResponse {
    _index: string;
    _type: string;
    _id: string;
    _seq_no: number;
    _primary_term?: unknown;
    _routing?: unknown;
    found: boolean;
    _source: Record<string, unknown>;
    _version?: number;
    fields?: unknown;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class ElasticManager {
    readonly bulkSize: number;

    readonly interval: NodeJS.Timeout;

    private operations: Operation[] = [];

    readonly client: Client;

    readonly namespace: string;

    protected async sendBulkRequest(operations: Operation[]): Promise<void> {
        logger.verbose(`ElasticConnector.sendBulkRequest: processing ${operations.length} operations`);
        if(_.isEmpty(operations)) return;
        try {
            const {body: responseBody} = await this.client.bulk<BulkResponse, any>({refresh: false, body: operations});
            const {errors, items} = responseBody;

            if(!errors) return;
            const erroredDocuments: ErroredDocument[] = [];
            // The items array has the same order of the dataset we just indexed.
            // The presence of the `error` key indicates that the operation
            // that we did for the document has failed.
            _.forEach(items, (action, i) => {
                const operation = _.keys(action)[0];
                if(action[operation as BulkResponseItemOp].error) {
                    erroredDocuments.push({
                        // If the status is 429 it means that you can retry the document,
                        // otherwise it's very likely a mapping error, and you should
                        // fix the document before to try it again.
                        status: action[operation as BulkResponseItemOp].status,
                        error: action[operation as BulkResponseItemOp].error,
                        operation: operations[i * 2] as MetaInfoOperation,
                        document: operations[i * 2 + 1] as DocOperation
                    });
                }
            });
            logger.error(
                `elasticConnector.sendBulkRequest(): erroredDocuments - ${JSON.stringify(erroredDocuments, null, 2)}`
            );
        } catch(error) {
            logger.error('elasticConnector.sendBulkRequest:', error);
        }
    }

    constructor({bulkSize, elasticNamespace, elasticClientOpts, elasticRotationIntervalMs}: ElasticSettings) {
        this.bulkSize = bulkSize;
        this.client = new Client(elasticClientOpts);
        this.namespace = elasticNamespace;
        this.interval = setInterval((): void => {
            void this.sendBulkRequest([...this.operations]); // eslint-disable-line no-void
            this.operations = [];
        }, elasticRotationIntervalMs);
        logger.verbose(`ElasticConnector: built connection using ${JSON.stringify(elasticClientOpts)}`);
    }

    public async createIndexIfNotExists(indexName: string, {mappings, settings}: Mapping): Promise<this> {
        const {body: isIndexExists} = await this.client.indices.exists({index: indexName});
        if(isIndexExists) {
            logger.info(`elastic.createIndexIfNotExists(): index ${indexName} already exists`);
            return this;
        }
        await this.client.indices.create({
            index: indexName,
            body: {
                mappings,
                settings
            }
        });
        logger.info(`elastic.createIndexIfNotExists(): index ${indexName} created`);
        return this;
    }

    public async getExistingDoc({indexName, _id}: {indexName: string, _id: string}): Promise<GetResponse | undefined> {
        try {
            const doc = await this.client.get<GetResponse>({
                index: indexName,
                id: _id
            });
            return doc.body;
        } catch(err) {
            logger.error(`cannot find item ${JSON.stringify({indexName, _id})}`);
        }
    }

    // insert event format https://docs.mongodb.com/manual/reference/change-events/#insert-event
    public insertDoc(data: MongoUpdateParams): void {
        const {indexName, _id, dateString, doc} = data;
        if(!doc) return;
        this.operations.push({
            index: {
                _index: indexName,
                _id,
                version: versioning.getVersionAsInteger(new Date(dateString)),
                version_type: 'external'
            }
        });
        this.operations.push(doc);
    }

    public async deleteDoc({_id, indexName}: MongoDeleteParams): Promise<void> {
        const existingDoc = await this.getExistingDoc({indexName, _id});
        if(!existingDoc?._version) return;

        this.operations.push({
            delete: {
                _index: indexName,
                _id,
                version: versioning.incrementVersionForDeletion(existingDoc._version),
                version_type: 'external'
            }
        });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default ElasticManager;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
