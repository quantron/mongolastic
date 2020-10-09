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

import {EventEmitter} from 'events';
import {MongoClient, MongoClientOptions, Db} from 'mongodb';
import logger from '../b12/logger';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface MongoDbSettings {
    database: string;
    mongoUrl: string;
    mongoClientOpts: MongoClientOptions | Record<string, unknown>;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class MongoManager extends EventEmitter {
    databaseName: string;

    connectionUrl: string;

    mongoClientOpts: MongoClientOptions | Record<string, unknown>;

    db!: Db; // ! - оператор, говорящий, что это значение не будет null или undefined

    client: MongoClient;

    constructor({database, mongoUrl, mongoClientOpts}: MongoDbSettings) {
        super();
        this.databaseName = database;
        this.connectionUrl = mongoUrl;
        this.mongoClientOpts = mongoClientOpts;
        this.client = new MongoClient(this.connectionUrl, this.mongoClientOpts);
    }

    async connect(): Promise<MongoManager> {
        await this.client.connect();
        this.db = this.client.db(this.databaseName);
        logger.info(`MongoConnection: successfully connected to $mongodb on ${this.connectionUrl}`);
        return this;
    }

    async disconnect(): Promise<MongoManager> {
        await this.client.close();
        return this;
    }

    // workaround for "MongoError: cannot open $changeStream for non-existent database"
    async createEmptyCollection(): Promise<MongoManager> {
        await this.db.createCollection('init');
        await this.db.dropCollection('init');
        logger.info('MongoConnection: successfully created and dropped empty collection');
        return this;
    }

    setupEventListeners(): MongoManager {
        this.db
            .on('close', (log) => {
                logger.info('close', log);
                this.emit('close', log);
            })
            .on('error', (error) => {
                logger.error('db Error:', error);
                this.emit('error', error);
            })
            .on('parseError', (error) => {
                logger.error('db parseError', error);
                this.emit('parseError', error);
            })
            .on('timeout', (error) => {
                logger.error('db timeout', error);
                this.emit('timeout', error);
            })
            .on('reconnect', () => {
                logger.info('connection reestablished with mongoDB');
                this.emit('reconnect');
            });
        return this;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default MongoManager;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
