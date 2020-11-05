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

import path from 'path';
import buildConfig, {Config} from './core/buildConfig';
import MongoManager from './core/mongoManager';
import ElasticManager from './core/elasticManager';
import CollectionWatcher from './core/collectionWatcher';
import {openMongoConnection, setupDatabaseListeners, buildCollectionWatchers, startWatching, stopWatching} from './core/connector';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type GlobalContainer = {
    isWatching: false;
} | {
    isWatching: true;
    mongo: MongoManager;
    elastic: ElasticManager;
    collectionWatchers: CollectionWatcher[];
    config: Config;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let globalContainer: GlobalContainer = {
    isWatching: false
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const exitGracefully = async(): Promise<void> => {
    if(!globalContainer.isWatching) {
        console.info('Process is not started');
        process.exit(0);
    }
    await stopWatching(globalContainer)
        .then(() => {
            console.info('Process exited gracefully');
            process.exit(0);
        })
        .catch((error: Error) => {
            console.error(`Process exited with error - ${error.toString()}`);
            process.exit(1);
        });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
process
    .on('SIGTERM', () => {
        console.info('SIGTERM signal received.');
        void exitGracefully();
    })
    .on('SIGINT', () => {
        console.info('SIGINT signal received.');
        void exitGracefully();
    })

    .on('uncaughtException', error => {
        console.error(`uncaughtException received - ${error.toString()}.`);
        console.error(error);
        void exitGracefully();
    })

    .on('unhandledRejection', error => {
        console.error('unhandledRejection received');
        console.error(error);
        void exitGracefully();
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const start = async(customConfigPath?: string): Promise<void> => {
    const config = await buildConfig(customConfigPath ? path.resolve(process.cwd(), customConfigPath) : null);
    const mongo = new MongoManager(config);
    const elastic = new ElasticManager(config);

    const container = {config, mongo, elastic};

    await openMongoConnection(container);
    const collectionWatchers = await buildCollectionWatchers(container);
    setupDatabaseListeners({...container, collectionWatchers});

    await startWatching(collectionWatchers);

    globalContainer = {
        isWatching: true,
        config,
        mongo,
        elastic,
        collectionWatchers
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {start, exitGracefully as stop};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
