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

import {ObjectId} from 'mongodb';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type MongoAttributeValue = {
    _id: ObjectId;
    value: string;
    displayValue: string;
    description: string;
    isLuxe: false;
    modified: string;
    created: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type ElasticAttributeValue = {
    _id: string;
    value: string;
    displayValue: string;
    description: string;
    isLuxe: false;
    modified: string;
    created: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type ElasticAttribute = {
    isVisible: boolean;
    type: string;
    name: string;
    fullName: string;
    description: string;
    order: string;
    values: ElasticAttributeValue[];
    created: string;
    modified: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type MongoAttribute = {
    _id: ObjectId;
    isVisible: boolean;
    type: string;
    name: string;
    fullName: string;
    description: string;
    order: string;
    values: MongoAttributeValue[];
    created: string;
    modified: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type ProductAttribute = {
    attributeId: ObjectId | string;
    attributeName: string;
    attributeType: string;
    attributeValue: string;
    attributeDisplayValue: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type MongoProduct = {
    _id: ObjectId;
    status: string;
    type: string;
    supplierId: string;
    article: string;
    name: string;
    priceRub: number;
    priceStoreRub: number;
    condition: string;
    cityId: ObjectId;
    areaId: ObjectId | '';
    address: string;
    isExchangePossible: boolean;
    isPack: boolean;
    isLuxe: boolean;
    description: string;
    clientId: ObjectId;
    moderated: string;
    categoryId: ObjectId;
    subCategoryId: ObjectId | '';
    attributes: ProductAttribute[];
    photoIds: ObjectId[];
    rejectionReasons: {
        title?: string;
        description?: string;
    }[];
    cloudUrl: string;
    cloudPreviewUrl: string;
    createdBy: ObjectId | string;
    updatedBy: ObjectId | string;
    rating: number;
    viewsCount: number;
    created: string;
    modified: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type ElasticProduct = {
    name: string;
    description: string;
    attributes: ProductAttribute[];
    search: string;
    status: string;
    cityId: string;
    areaId: string;
    condition: string;
    clientId: string;
    priceRub: number;
    isLuxe: boolean;
    isExchangePossible: boolean;
    supplierId: string;
    categoryId: string;
    subCategoryId: string;
    created: string;
    modified: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
type CategoryAttribute = {
    attributeId: ObjectId | string;
    isRequired: boolean;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type MongoCategory = {
    _id: ObjectId;
    isVisible: boolean;
    isTop: boolean;
    attributes: CategoryAttribute[];
    name: string;
    parentId: ObjectId;
    order: string;
    description: string;
    imageType: string;
    imageSize: number;
    imageUrl: string;
    created: string;
    modified: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type ElasticCategory = {
    isVisible: boolean;
    isTop: boolean;
    attributes: CategoryAttribute[];
    name: string;
    fullName: string;
    parentId: string;
    order: string;
    description: string;
    imageType: string;
    imageSize: number;
    imageUrl: string;
    created: string;
    modified: string;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
