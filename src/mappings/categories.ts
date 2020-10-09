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

import {charFilter, filters, analyzers} from './configuration';
import {MongoCategory, ElasticCategory} from './types';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const categoryProperties = {
    name: {
        type: 'text',
        analyzer: 'russianSimple'
    },
    fullName: {
        type: 'text',
        analyzer: 'russianSimple'
    },
    attributes: {
        type: 'nested',
        properties: {
            attributeId: {type: 'keyword'},
            isRequired: {type: 'boolean'}
        }
    },
    parentId: {type: 'keyword'},
    order: {type: 'keyword'},
    isTop: {type: 'boolean'},
    isVisible: {type: 'boolean'},
    created: {type: 'date', format: 'YYYY-MM-DD HH:mm:ss.SSS'},
    modified: {type: 'date', format: 'YYYY-MM-DD HH:mm:ss.SSS'}
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default {
    mappings: {
        properties: categoryProperties
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
    transformFunc: (category: MongoCategory): ElasticCategory => ({
        ...category,
        _id: category._id.toString(),
        parentId: category.parentId.toString()
    }),
    versionField: 'modified'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
