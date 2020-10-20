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
import {Collection} from 'mongodb';
import {charFilter, filters, analyzers} from './configuration';
import {MongoAttribute, ElasticAttribute} from './types';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const properties = {
    isVisible: {type: 'boolean'},
    type: {type: 'keyword'},
    name: {type: 'text'},
    fullName: {type: 'text'},
    description: {type: 'text'},
    values: {
        type: 'nested',
        properties: {
            _id: {type: 'keyword'},
            value: {
                type: 'text',
                analyzer: 'russianSimple'
            },
            displayValue: {
                type: 'text',
                analyzer: 'russianSimple'
            },
            description: {
                type: 'text',
                analyzer: 'russianSimple'
            },
            isLuxe: {type: 'boolean'},
            created: {type: 'date'},
            modified: {type: 'date'}
        }
    },
    order: {type: 'keyword'},
    created: {type: 'date'},
    modified: {type: 'date'}
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default {
    mappings: {
        properties
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
    transformFunc: (
        {_id, values, created, modified, ...attribute}: MongoAttribute,
        collection: Collection,
        callback: (error: Error | null, elasticDoc: ElasticAttribute) => void
    ): void =>
        callback(null, {
            ...attribute,
            created: new Date(created).toJSON(),
            modified: new Date(modified).toJSON(),
            values: _.map(values, ({_id, created, modified, ...value}) => ({
                ...value,
                _id: _id.toString(),
                created: new Date(created).toJSON(),
                modified: new Date(modified).toJSON()
            }))
        }),
    versionField: 'modified'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
