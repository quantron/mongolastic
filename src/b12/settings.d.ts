import {MongoClientOptions} from 'mongodb';
import {ClientOptions as ElasticClientOptions} from '@elastic/elasticsearch';

type MappingPaths = '../mappings/products' | '../mappings/categories';

export interface LocalConfig {
    mongo: {
        options?: {
            poolSize?: number;
            ssl?: boolean;
            sslCA: string;
            sslCert: string;
            sslKey: string;
        };
        connectionOptions?: MongoClientOptions;
        connectionUrl: string;
        database: string;
        user?: string;
        password?: string;
        collections: string[];
    };
    elasticsearch: {
        namespace: string;
        elasticRotationIntervalMs?: number;
        connectionOptions: ElasticClientOptions;
    };
    mappings: {
        [collectionName: string]: MappingPaths;
    };
    bulkSize?: number;
    ignoreResumeTokensOnStart?: boolean;
    resumeTokenIntervalMs?: number;
    resumeTokenCollection?: string;
}

export default getPath;
export function read(): any;
export function readFromFile(path: any): any;
export function get(): LocalConfig;
export function getPath(settingPath: any, defaultValue: any): any;
