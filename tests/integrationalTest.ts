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

import qs, {ParsedUrlQueryInput} from 'querystring';
import {ObjectId} from 'mongodb';

import should from 'should';
import _ from 'lodash';
import * as elastic from '@elastic/elasticsearch';
import * as mongo from 'mongodb';
import bluebird from 'bluebird';

import {GetResponse} from '../src/core/elasticManager';
import {MongoProduct} from '../src/mappings/types';

import {get as getSettings} from '../src/b12/settings';
import getProducts from './fixtures/products';
import {start, stop} from '../src/core';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type Token = {
    _id: ObjectId;
    token: unknown;
    collectionName: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const {
    elasticsearch: {namespace = 'test', connectionOptions: elasticClientOpts},
    mongo: mongoSettings,
    resumeTokenCollection = 'connector'
} = getSettings();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let elasticClient: elastic.Client;
let mongoClient: mongo.MongoClient;
let mongoDb: mongo.Db;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Integration tests', () => {
    before('build elastic', () => {
        elasticClient = new elastic.Client(elasticClientOpts);
    });
    before('build mongo', async() => {
        const mongoUrl = _.compact([
            'mongodb://',
            mongoSettings.user && encodeURIComponent(mongoSettings.user),
            mongoSettings.password && `:${encodeURIComponent(mongoSettings.password)}`,
            mongoSettings.user && '@',
            mongoSettings.connectionUrl,
            mongoSettings.options && `?${qs.stringify(mongoSettings.options as ParsedUrlQueryInput)}`
        ]).join('');

        const mongoClientOpts = mongoSettings.connectionOptions || {};

        mongoClient = new mongo.MongoClient(mongoUrl, mongoClientOpts);
        await mongoClient.connect();
        mongoDb = mongoClient.db(mongoSettings.database);
    });

    after(() => stop());
    after(async() => {
        await mongoDb.collection('products').deleteMany({});
        await mongoDb.collection(resumeTokenCollection).deleteMany({});
        await mongoClient.close();
    });

    it('works', async() => {
        await start();
        const [product] = getProducts();
        await mongoDb.collection('products').insertOne(product);
        await bluebird.delay(1000);
        const {body: productInElastic} = await elasticClient.get<GetResponse>({
            index: `${namespace}.products`,
            id: product._id.toHexString()
        });
        productInElastic.should.be.Object();
        productInElastic.should.match({
            _id: product._id.toHexString(),
            _type: '_doc',
            _version: new Date(product.modified).getTime()
        });
        productInElastic._source.should.match({
            name: product.name,
            description: product.description
        });
        await stop();

        const token: Token | null = await mongoDb.collection(resumeTokenCollection).findOne({collectionName: 'products'});
        should.ok(token);
        token?.should.be.Object();
        token?.should.have.properties(['_id', 'token', 'collectionName']);
    });

    it('works with bulk data added before start', async() => {
        const products = _.take(getProducts(), 50);

        await mongoDb.collection('products').insertMany(products);

        await start();
        await bluebird.delay(1000);
        await bluebird.each(products, async(product) => {
            const {body: productInElastic} = await elasticClient.get<GetResponse>({
                index: `${namespace}.products`,
                id: product._id.toHexString()
            });
            productInElastic.should.be.Object();
            productInElastic.should.match({
                _id: product._id.toHexString(),
                _type: '_doc',
                _version: new Date(product.modified).getTime()
            });
            productInElastic._source.should.match({
                name: product.name,
                description: product.description
            });
        });
        await stop();

        const token: Token | null = await mongoDb.collection(resumeTokenCollection).findOne({collectionName: 'products'});
        should.ok(token);
        token?.should.be.Object();
        token?.should.have.properties(['_id', 'token', 'collectionName']);
    });

    it('works with deletion data', async() => {
        await start();
        const productInMongo = await mongoDb.collection<MongoProduct>('products').findOne({});
        should.ok(productInMongo);
        if(!productInMongo) return; // had to because of typescript
        const {body: productInElastic} = await elasticClient.get<GetResponse>({
            index: `${namespace}.products`,
            id: productInMongo._id.toHexString()
        });
        should.ok(productInElastic);
        if(!productInElastic) return; // had to because of typescript

        await mongoDb.collection('products').deleteOne({_id: productInMongo._id});
        await bluebird.delay(1000);

        await elasticClient
            .get<GetResponse>({index: `${namespace}.products`, id: productInMongo._id.toHexString()})
            .catch((error) => {
                should.ok(error);
                (error as elastic.ApiError).should.have.property('statusCode', 404);
            });

        await stop();
    });

    it('works with update data', async() => {
        await start();

        const productInMongo = await mongoDb.collection<MongoProduct>('products').findOne({});
        should.ok(productInMongo);
        if(!productInMongo) return; // had to because of typescript
        const {body: productInElasticOld} = await elasticClient.get<GetResponse>({
            index: `${namespace}.products`,
            id: productInMongo._id.toHexString()
        });
        should.ok(productInElasticOld);
        if(!productInElasticOld) return; // had to because of typescript

        const newName = `test name ${new ObjectId().toHexString()}`;
        await mongoDb
            .collection('products')
            .updateOne({_id: productInMongo._id}, {$set: {name: newName, modified: new Date()}});
        await bluebird.delay(1000);

        const {body: productInElastic} = await elasticClient.get<GetResponse>({
            index: `${namespace}.products`,
            id: productInMongo._id.toHexString()
        });
        productInElastic._source.should.match({
            name: newName
        });

        await stop();
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
