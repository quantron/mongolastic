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
import fp from 'lodash/fp';
import {translitEnRu} from '../b12/translit';
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
            attributeId: {type: 'keyword'},
            attributeValue: {type: 'keyword'},
            attributeName: {type: 'keyword'},
            attributeDisplayValue: {type: 'text', analyzer: 'russianSimple'}
        }
    },
    search: {
        type: 'text',
        analyzer: 'russianSimple'
    },
    status: {type: 'keyword'},
    cityId: {type: 'keyword'},
    areaId: {type: 'keyword'},
    condition: {type: 'keyword'},
    clientId: {type: 'keyword'},
    priceRub: {type: 'float'},
    isLuxe: {type: 'boolean'},
    isExchangePossible: {type: 'boolean'},
    supplierId: {type: 'keyword'},
    categoryId: {type: 'keyword'},
    subCategoryId: {type: 'keyword'},
    created: {type: 'date', format: 'YYYY-MM-DD HH:mm:ss.SSS'},
    modified: {type: 'date', format: 'YYYY-MM-DD HH:mm:ss.SSS'}
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const transformFunc = (product: MongoProduct): ElasticProduct => {
    const isLatin = (str: string) => /['a-z']/i.test(_.toLower(str));

    const attributes = _.flatMap(
        product.attributes,
        ({attributeType, attributeDisplayValue}) =>
            (attributeType === 'brand' && isLatin(attributeDisplayValue)
                ? [attributeDisplayValue, translitEnRu(attributeDisplayValue)]
                : [attributeDisplayValue])
    );

    const search = _.flow(
        ({name}) => [..._.split(name, /[ ,.]/), ...attributes],
        fp.compact,
        fp.join(' '),
        fp.lowerCase
    )(product);

    return {
        name: product.name,
        description: product.description,
        attributes: product.attributes,
        search,
        status: product.status,
        cityId: product.cityId.toString(),
        areaId: product.cityId.toString(),
        condition: product.condition,
        clientId: product.clientId.toString(),
        priceRub: product.priceRub,
        isLuxe: product.isLuxe,
        isExchangePossible: product.isExchangePossible,
        supplierId: product.supplierId,
        categoryId: product.categoryId.toString(),
        subCategoryId: product.subCategoryId.toString(),
        created: product.created,
        modified: product.modified
    };
};

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
