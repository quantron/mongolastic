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

import buildConfig from './buildConfig';
import MongoManager from './mongoManager';
import ElasticManager from './elasticManager';
import Connector from './connector';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let connector: Connector;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const start = async(): Promise<void> => {
    const config = await buildConfig();
    const mongo = new MongoManager(config);
    const elastic = new ElasticManager(config);
    connector = new Connector({config, mongo, elastic});

    await connector
        .openMongoConnection()
        .setupDatabaseListeners()
        .buildCollectionWatchers()
        .start();

    process.on('SIGTERM', () => {
        console.info('SIGTERM signal received.');
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
    });

    process.on('SIGINT', () => {
        console.info('SIGINT signal received.');
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
    });

    process.on('uncaughtException', (error) => {
        console.error(`uncaughtException received - ${error.toString()}.`);
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
    });

    process.on('unhandledRejection', (error) => {
        console.error('unhandledRejection received');
        if(error) console.error(error);
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
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const stop = (): Promise<Connector | void> => connector?.stop();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {
    start,
    stop
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
