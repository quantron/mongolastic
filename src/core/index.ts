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
import buildConfig from './buildConfig';
import MongoManager from './mongoManager';
import ElasticManager from './elasticManager';
import Connector from './connector';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let connector: Connector;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const start = async(customConfigPath?: string): Promise<void> => {
    const config = await buildConfig(customConfigPath ? path.resolve(process.cwd(), customConfigPath) : null);
    const mongo = new MongoManager(config);
    const elastic = new ElasticManager(config);
    connector = new Connector({config, mongo, elastic});

    await connector
        .openMongoConnection()
        .setupDatabaseListeners()
        .buildCollectionWatchers()
        .start();

    const exitGracefully = () =>
        connector
            .stop()
            .then(() => {
                console.info('Process exited gracefully');
                process.exit(0);
            })
            .catch((error: Error) => {
                console.error(`Process exited with error - ${error.toString()}`);
                process.exit(1);
            });

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
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const stop = (): Promise<Connector | void> => connector?.stop();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {start, stop};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
