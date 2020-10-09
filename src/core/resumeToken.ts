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

import {Collection, ObjectId, ResumeToken} from 'mongodb';
import logger from '../b12/logger';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface TokenDoc {
    _id: ObjectId;
    collectionName: string;
    token: ResumeToken;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class ResumeTokenManager {
    readonly watchingCollectionName: string;

    private token?: ResumeToken;

    readonly storageCollection: Collection<TokenDoc>;

    constructor({
        collectionName,
        storageCollection
    }: {
        collectionName: string;
        storageCollection: Collection<TokenDoc>;
    }) {
        this.watchingCollectionName = collectionName;
        this.storageCollection = storageCollection;
        logger.verbose(`ResumeToken(${this.watchingCollectionName}) - created`);
    }

    public setToken(token: ResumeToken): void {
        logger.verbose(`ResumeToken(${this.watchingCollectionName}) - setting token ${token.toString()}`);
        this.token = token;
    }

    public async read(): Promise<ResumeToken | undefined> {
        logger.verbose(`ResumeToken(${this.watchingCollectionName}).read - reading token from db`);
        try {
            const result = await this.storageCollection.findOne({collectionName: this.watchingCollectionName});
            logger.verbose(`ResumeToken(${this.watchingCollectionName}).read - found token ${JSON.stringify(result)}`);
            this.token = result?.token;
            return this.token;
        } catch(err) {
            logger.error(`resumeToken for ${this.watchingCollectionName} could not be retrieved from database`);
            logger.debug(err);
            delete this.token;
            return this.token;
        }
    }

    public async upsertIfExists(): Promise<void> {
        logger.verbose(`ResumeToken(${this.watchingCollectionName}).upsertIfExists - try to upsert ${this.token?.toString() || 'non-existent'}`);
        try {
            if(!this.token) {
                await this.storageCollection.deleteOne({collectionName: this.watchingCollectionName});
                return;
            }

            await this.storageCollection.updateOne(
                {collectionName: this.watchingCollectionName},
                {$set: {token: this.token}},
                {upsert: true}
            );
            logger.verbose(`resumeToken for collection ${this.watchingCollectionName} saved to database`);
        } catch(error) {
            logger.verbose(`resumeToken for collection ${this.watchingCollectionName} could not be saved to database`);
            logger.error(error);
        }
    }

    public async reset(): Promise<void> {
        delete this.token;
        await this.upsertIfExists();
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default ResumeTokenManager;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
