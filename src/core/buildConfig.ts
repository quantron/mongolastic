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
import qs, {ParsedUrlQueryInput} from 'querystring';
import _ from 'lodash';
import bluebird from 'bluebird';
import {MongoClientOptions} from 'mongodb';
import {ClientOptions as ElasticClientOptions} from '@elastic/elasticsearch';
import {get as getSettings} from '../b12/settings';
import logger from '../b12/logger';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface Mapping {
    mapping: {
        properties: Record<string, unknown>;
    };
    settings: Record<string, unknown>;
    transformFunc: <MongoDoc, ElasticDoc>(mongoDoc: MongoDoc) => ElasticDoc;
    versionField: string;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface Mappings {
    [collectionName: string]: Mapping;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface Config {
    bulkSize: number;
    database: string;
    mongoUrl: string;
    mongoClientOpts: MongoClientOptions | Record<string, unknown>;
    mappings: Mappings;
    elasticNamespace: string;
    elasticClientOpts: ElasticClientOptions;
    collections: string[];
    resumeTokenIntervalMs: number;
    resumeTokenCollection: string;
    ignoreResumeTokensOnStart: boolean;
    elasticRotationIntervalMs: number;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function buildConfig(): Promise<Config> {
    const {
        bulkSize = 1000,
        mappings: mappingPaths,
        elasticsearch: {namespace, connectionOptions: elasticClientOpts, elasticRotationIntervalMs = 500},
        resumeTokenIntervalMs = 6000,
        resumeTokenCollection = 'connector',
        ignoreResumeTokensOnStart = false,
        mongo
    } = getSettings();

    const mongoUrl = _.compact([
        'mongodb://',
        mongo.user && encodeURIComponent(mongo.user),
        mongo.password && `:${encodeURIComponent(mongo.password)}`,
        mongo.user && '@',
        mongo.connectionUrl,
        mongo.options && `?${qs.stringify(mongo.options as ParsedUrlQueryInput)}`
    ]).join('');

    const mongoClientOpts = mongo.connectionOptions || {};

    const mappings = await bluebird.props(
        _.mapValues(
            mappingPaths,
            mappingPath => import(path.resolve(__dirname, mappingPath)).then(module => module.default) // eslint-disable-line
        )
    );
    logger.verbose('buildConfig(): config successfully built');

    return {
        database: mongo.database,
        collections: mongo.collections,
        mongoUrl,
        mongoClientOpts,
        mappings,
        bulkSize,
        elasticNamespace: namespace,
        elasticClientOpts,
        resumeTokenIntervalMs,
        resumeTokenCollection,
        ignoreResumeTokensOnStart,
        elasticRotationIntervalMs
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default buildConfig;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
