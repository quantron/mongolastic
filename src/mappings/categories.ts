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
    created: {type: 'date'},
    modified: {type: 'date'}
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
    transformFunc: (
        {_id, created, modified, ...category}: MongoCategory,
        collection: Collection<MongoCategory>,
        callback: (error: Error | null, elasticDoc?: ElasticCategory) => void
    ): void => {
        const data = {
            ...category,
            created: new Date(created).toJSON(),
            modified: new Date(modified).toJSON(),
            parentId: category.parentId.toString()
        };
        if(!category.parentId) return callback(null, {...data, fullName: category.name});
        collection.findOne({_id: category.parentId}, {projection: ['name']}, (error, result) => {
            if(error) return callback(error);
            const {name: parentName = ''} = result || {};
            const fullName = `${parentName}${parentName ? ` ${category.name}` : category.name}`;
            return callback(null, {...data, fullName});
        });
    },
    versionField: 'modified'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
