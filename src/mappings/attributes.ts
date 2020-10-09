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
import {charFilter, filters, analyzers} from './configuration';
import {Attribute} from './types';

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
            created: {type: 'date', format: 'YYYY-MM-DD HH:mm:ss.SSS'},
            modified: {type: 'date', format: 'YYYY-MM-DD HH:mm:ss.SSS'}
        }
    },
    order: {type: 'keyword'},
    created: {type: 'date', format: 'YYYY-MM-DD HH:mm:ss.SSS'},
    modified: {type: 'date', format: 'YYYY-MM-DD HH:mm:ss.SSS'}
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
    transformFunc: ({_id, values, ...attribute}: Attribute): Attribute => ({
        ...attribute,
        _id: _id.toString(),
        values: _.map(values, (value) => ({...value, _id: value._id.toString()}))
    }),
    versionField: 'modified'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
