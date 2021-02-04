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

import {Collection} from 'mongodb';
import {MongoProduct, ElasticProduct} from './types';
import {charFilter, filters, analyzers} from './configuration';

// elastic scripting language
// https://www.elastic.co/guide/en/elasticsearch/painless/7.5/painless-guide.html

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const productProperties = {
    name: {
        type: 'text',
        analyzer: 'russianSimple'
    },
    description: {
        type: 'text',
        analyzer: 'russianSimple'
    },
    attributes: {
        type: 'nested',
        properties: {
            _id: {type: 'keyword'},
            valueId: {type: 'keyword'}
        }
    },
    status: {type: 'keyword'},
    cityId: {type: 'keyword'},
    areaId: {type: 'keyword'},
    condition: {type: 'keyword'},
    clientId: {type: 'keyword'},
    priceRub: {type: 'float'},
    isLuxe: {type: 'boolean'},
    isExchangePossible: {type: 'boolean'},
    isImported: {type: 'boolean'},
    supplierId: {type: 'keyword'},
    categoryId: {type: 'keyword'},
    subCategoryId: {type: 'keyword'},
    created: {type: 'date'},
    modified: {type: 'date'}
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const transformFunc = (
    product: MongoProduct,
    collection: Collection<MongoProduct>,
    callback: (error: Error | null, elasticDoc?: ElasticProduct) => void
): void => callback(null, {
    name: product.name,
    description: product.description,
    attributes: product.attributes,
    status: product.status,
    cityId: product.cityId.toString(),
    areaId: product.areaId.toString(),
    condition: product.condition,
    clientId: product.clientId.toString(),
    priceRub: product.priceRub,
    isLuxe: product.isLuxe,
    isExchangePossible: product.isExchangePossible,
    isImported: product.isImported,
    supplierId: product.supplierId,
    categoryId: product.categoryId.toString(),
    subCategoryId: product.subCategoryId.toString(),
    created: new Date(product.created).toJSON(),
    modified: new Date(product.modified).toJSON()
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default {
    mappings: {
        properties: productProperties
    },
    settings: {
        index: {
            blocks: {
                read_only_allow_delete: null
            }
        },
        analysis: {
            analyzer: analyzers,
            filter: filters,
            char_filter: charFilter
        }
    },
    transformFunc,
    versionField: 'modified'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
