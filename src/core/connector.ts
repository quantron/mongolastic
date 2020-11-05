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
import {MongoError} from 'mongodb';
import {Config, Mapping} from './buildConfig';
import MongoManager from './mongoManager';
import ElasticManager from './elasticManager';
import CollectionWatcher from './collectionWatcher';
import logger from '../b12/logger';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface Container {
    config: Config;
    mongo: MongoManager;
    elastic: ElasticManager;
}

type ContainerWithWatchers = Container & {collectionWatchers: CollectionWatcher[]};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * write all resumeTokens to database
 * so we can keep info on where we stopped watching
 */
const stopWatching = async({mongo, elastic, collectionWatchers}: ContainerWithWatchers): Promise<void> => {
    elastic.pruneQueue();
    if(!mongo.client.isConnected()) return this;
    const removeChangeStreams = _.invokeMap(
        collectionWatchers,
        'removeChangeStream'
    );
    await Promise.all(removeChangeStreams);
    await mongo.disconnect();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * save progress on mongo connection timeout
 */
const onTimeout = (container: ContainerWithWatchers) => (error: MongoError): void => {
    logger.error(`Connector.onTimeout(): ${error.toString()}`);
    void stopWatching(container);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * initiate watching on mongo reconnect
 */
const onReconnect = ({collectionWatchers}: ContainerWithWatchers) => (): void => {
    logger.info('Connector.onReconnect(): connection with mongo is reestablished');
    const restartWatchingPromise = _.map(collectionWatchers, async watcher => {
        await watcher.resumeToken?.read();
        await watcher.restartWatching({ignoreResumeToken: false});
    });
    void Promise.all(restartWatchingPromise);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
 * connect
 * create empty collection to avoid error for watching on nonexistent database
 * listen to specific events
 */
const openMongoConnection = async({mongo}: Container): Promise<void> => {
    await mongo.connect();
    await mongo.createEmptyCollection();
    mongo.setupEventListeners();
    logger.verbose('Connector: connected to mongo');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const setupDatabaseListeners = (container: ContainerWithWatchers) => (): void => {
    container
        .mongo
        .on('timeout', onTimeout(container))
        .on('reconnect', onReconnect(container));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const startWatching = async(collectionWatchers: CollectionWatcher[]): Promise<void> => {
    const watchPromises = _.invokeMap(collectionWatchers, 'watch');
    await Promise.all(watchPromises);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const buildOneWatcher = (
    {mongo, elastic, config}: Container
) => async(mapping: Mapping, collectionName: string): Promise<CollectionWatcher> => {
    const watcherContainer = {
        collectionName,
        mongo,
        elastic,
        mapping,
        indexName: `${config.elasticNamespace}.${collectionName}`,
        resumeTokenCollectionName: config.resumeTokenCollection
    };
    const watcher = new CollectionWatcher(watcherContainer);
    await watcher.createElasticIndex();
    logger.verbose(
        `Connector.buildOneWatcher(): built watcher with conf ${JSON.stringify({
            collectionName,
            indexName: watcherContainer.indexName,
            mapping
        })}`
    );
    return watcher;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const buildCollectionWatchers = async(container: Container): Promise<CollectionWatcher[]> => {
    const {mappings} = container.config;

    const watcherBuildingPromises = _.map(mappings, buildOneWatcher(container));
    const collectionWatchers = await Promise.all(watcherBuildingPromises);
    return collectionWatchers;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {
    stopWatching,
    startWatching,
    openMongoConnection,
    setupDatabaseListeners,
    buildCollectionWatchers
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
