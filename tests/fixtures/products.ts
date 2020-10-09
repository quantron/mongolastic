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
import {MongoProduct} from '../../src/mappings/types';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default (): MongoProduct[] => [
    {
        _id: new ObjectId(),
        status: 'new',
        type: 'client',
        supplierId: '000000012',
        article: 'FA-0000012',
        name: 'boots',
        priceRub: 100,
        priceStoreRub: 110,
        condition: 'used',
        cityId: new ObjectId(),
        areaId: new ObjectId(),
        address: 'address',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: '',
        attributes: [],
        photoIds: [],
        rejectionReasons: [],
        cloudUrl: '',
        cloudPreviewUrl: '',
        createdBy: new ObjectId(),
        updatedBy: new ObjectId(),
        rating: 0,
        viewsCount: 1,
        created: '2020-09-27 08:19:50.776',
        modified: '2020-09-27 08:19:50.874'
    },
    {
        _id: new ObjectId(),
        status: 'rejected',
        type: 'client',
        supplierId: '000000011',
        article: 'FA-0000011',
        name: 'boots',
        priceRub: 100,
        priceStoreRub: 110,
        condition: 'used',
        cityId: new ObjectId(),
        areaId: new ObjectId(),
        address: 'address',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '2020-09-27 08:19:51.231',
        categoryId: new ObjectId(),
        subCategoryId: '',
        attributes: [],
        photoIds: [],
        rejectionReasons: [
            {
                title: 'Контактная информация в названии',
                description:
                'В названии объявления использованы контактные данные: номер телефона, почтовый адрес, ссылки, ID мессенджеров.'
            }
        ],
        cloudUrl: '',
        cloudPreviewUrl: '',
        createdBy: new ObjectId(),
        updatedBy: new ObjectId(),
        rating: 0,
        viewsCount: 1,
        created: '2020-09-27 08:19:50.777',
        modified: '2020-09-27 08:19:51.231'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5ebc1cebd3c19a7e1b3b985f',
        article: 'FA-0000013',
        name: 'Школьный костюм и школьные брюки для мальчика',
        priceRub: 3500,
        priceStoreRub: 0,
        condition: 'new',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [
            {
                attributeId: new ObjectId(),
                attributeName: 'Пол',
                attributeType: 'gender',
                attributeValue: 'Для мальчика',
                attributeDisplayValue: 'Для мальчика'
            }
        ],
        photoIds: [
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId()
        ],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_919fecc0-4c86-44f9-9b64-914cba0c4001.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_a67d33a6-6873-4e22-b56e-36ffe2272fd6_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:05.391',
        modified: '2020-10-06 15:45:05.437'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5eb0682cd138b3189908e0bb',
        article: 'FA-0000014',
        name: 'Зеленая школьная форма для мальчика и девочки',
        priceRub: 1750,
        priceStoreRub: 0,
        condition: 'new',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [
            {
                attributeId: new ObjectId(),
                attributeName: 'Пол',
                attributeType: 'gender',
                attributeValue: 'Для девочки',
                attributeDisplayValue: 'Для девочки'
            },
            {
                attributeId: new ObjectId(),
                attributeName: 'Цвет',
                attributeType: 'color',
                attributeValue: '#0D5839',
                attributeDisplayValue: 'Зеленый'
            }
        ],
        photoIds: [new ObjectId()],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_452d8e8c-3443-4212-b966-af893b5583e5.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_3c5c771a-3b58-4504-805b-0a7400c7e926_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:06.111',
        modified: '2020-10-06 15:45:06.131'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5f2d4cda89e1897587139e20',
        article: 'FA-0000015',
        name: 'Школьный сарафан для девочки',
        priceRub: 1895,
        priceStoreRub: 0,
        condition: 'new',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [
            {
                attributeId: new ObjectId(),
                attributeName: 'Цвет',
                attributeType: 'color',
                attributeValue: '#234F83',
                attributeDisplayValue: 'Синий'
            },
            {
                attributeId: new ObjectId(),
                attributeName: 'Пол',
                attributeType: 'gender',
                attributeValue: 'Для девочки',
                attributeDisplayValue: 'Для девочки'
            }
        ],
        photoIds: [new ObjectId()],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_e9b3cb45-f804-4980-9cd5-ca4643b29fc1.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_75eeee89-e801-4e39-9120-953ebff1d6ca_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:06.502',
        modified: '2020-10-06 15:45:06.514'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5ee37fc3e22a0d68cd1d81ca',
        article: 'FA-0000016',
        name: 'Бордовая школьная форма для девочки и мальчика',
        priceRub: 890,
        priceStoreRub: 0,
        condition: 'new',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [
            {
                attributeId: new ObjectId(),
                attributeName: 'Цвет',
                attributeType: 'color',
                attributeValue: '#61020B',
                attributeDisplayValue: 'Бордовый'
            },
            {
                attributeId: new ObjectId(),
                attributeName: 'Пол',
                attributeType: 'gender',
                attributeValue: 'Для девочки',
                attributeDisplayValue: 'Для девочки'
            }
        ],
        photoIds: [new ObjectId()],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_1aa85636-08eb-4224-b65e-1c16d64e7e78.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_ffb3faf2-4692-42fc-b206-3bd1a87ffea1_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:06.958',
        modified: '2020-10-06 15:45:06.966'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5eda5f4b35f2720b854ea033',
        article: 'FA-0000017',
        name: 'Школьная форма для девочки в красную клетку',
        priceRub: 1595,
        priceStoreRub: 0,
        condition: 'new',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [
            {
                attributeId: new ObjectId(),
                attributeName: 'Цвет',
                attributeType: 'color',
                attributeValue: '#234F83',
                attributeDisplayValue: 'Синий'
            },
            {
                attributeId: new ObjectId(),
                attributeName: 'Пол',
                attributeType: 'gender',
                attributeValue: 'Для девочки',
                attributeDisplayValue: 'Для девочки'
            }
        ],
        photoIds: [
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId()
        ],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_55c4681b-dccc-44ab-a10a-7274dfe6127b.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_b3f49bbe-68d1-4e5b-9387-a6a183b8ae2d_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:07.770',
        modified: '2020-10-06 15:45:07.781'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5ef760d318a45e34a03457ed',
        article: 'FA-0000018',
        name: 'Школьная форма',
        priceRub: 795,
        priceStoreRub: 0,
        condition: 'new',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [],
        photoIds: [new ObjectId()],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_a35c7553-4a17-4285-827c-13f9b6096a77.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_a35951b2-be6b-452c-87c8-bfa15c820b3c_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:08.191',
        modified: '2020-10-06 15:45:08.200'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5f2d4b7829db3a64147a7adb',
        article: 'FA-0000019',
        name: 'Школьный костюм для мальчика',
        priceRub: 3990,
        priceStoreRub: 0,
        condition: 'new',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [
            {
                attributeId: new ObjectId(),
                attributeName: 'Цвет',
                attributeType: 'color',
                attributeValue: '#234F83',
                attributeDisplayValue: 'Синий'
            },
            {
                attributeId: new ObjectId(),
                attributeName: 'Пол',
                attributeType: 'gender',
                attributeValue: 'Для мальчика',
                attributeDisplayValue: 'Для мальчика'
            }
        ],
        photoIds: [new ObjectId()],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_1e722164-20a5-4e82-af98-adcd9f642a7d.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_ac03693c-6665-4d99-b7c4-b200ea1f3f93_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:08.659',
        modified: '2020-10-06 15:45:08.671'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5ea589a1dce9fc51a6485333',
        article: 'FA-0000020',
        name: 'Школьная форма для девочек в розовую клетку',
        priceRub: 1000,
        priceStoreRub: 0,
        condition: 'new',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [
            {
                attributeId: new ObjectId(),
                attributeName: 'Цвет',
                attributeType: 'color',
                attributeValue: '#787D80',
                attributeDisplayValue: 'Серый'
            },
            {
                attributeId: new ObjectId(),
                attributeName: 'Пол',
                attributeType: 'gender',
                attributeValue: 'Для девочки',
                attributeDisplayValue: 'Для девочки'
            }
        ],
        photoIds: [new ObjectId()],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_04356999-c2df-4c80-b396-ff2b48f4b07c.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_a54eca47-e80f-4b6d-a039-f633acab5ebf_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:09.020',
        modified: '2020-10-06 15:45:09.033'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5ea59a166c86cb33e3627283',
        article: 'FA-0000021',
        name: 'Школьный сарафан для девочки в клетку',
        priceRub: 2455,
        priceStoreRub: 0,
        condition: 'new',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [
            {
                attributeId: new ObjectId(),
                attributeName: 'Цвет',
                attributeType: 'color',
                attributeValue: '#234F83',
                attributeDisplayValue: 'Синий'
            },
            {
                attributeId: new ObjectId(),
                attributeName: 'Пол',
                attributeType: 'gender',
                attributeValue: 'Для девочки',
                attributeDisplayValue: 'Для девочки'
            }
        ],
        photoIds: [new ObjectId()],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c9105638d13dd33822945_3c3547ab-cd7d-441d-a71f-4d48881af140.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c9105638d13dd33822945_ed03d621-4ff6-418f-90ad-7cba2791d01e_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:09.791',
        modified: '2020-10-06 15:45:09.802'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5ebcb4a1cc0f0f5a471137f3',
        article: 'FA-0000022',
        name: 'Школьный сарафан, школьная юбка',
        priceRub: 2455,
        priceStoreRub: 0,
        condition: 'new',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [],
        photoIds: [new ObjectId()],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_9f588099-b6ce-4989-bf42-4f6af15086ad.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c90ff638d13dd33822912_a7304ef1-46b6-4e0e-ae03-2aa8c143be07_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:10.426',
        modified: '2020-10-06 15:45:10.441'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5f68751a19f33f05122b2543',
        article: 'FA-0000023',
        name: 'Ванночка детская «Кролики» с термометром и сливом',
        priceRub: 640,
        priceStoreRub: 0,
        condition: 'used',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [],
        photoIds: [new ObjectId()],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c9106638d13dd33822951_3544e4fc-55f6-4a50-b3c7-ce3e36b533ae.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c9106638d13dd33822951_5970b679-bd3b-4c58-a6ff-0f01fbbe69dd_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:11.301',
        modified: '2020-10-06 15:45:11.314'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5e6dedbd65bcf1828a4a42a1',
        article: 'FA-0000024',
        name: 'Зайка Ми большая 32 см. Ассортимент 44 позиции',
        priceRub: 1990,
        priceStoreRub: 0,
        condition: 'used',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [],
        photoIds: [
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId()
        ],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c9107638d13dd33822957_64664bd5-4dfb-4731-807e-acb799d8e5df.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c9107638d13dd33822957_45751e0d-f14d-47c2-b210-510eab83c7b0_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:13.098',
        modified: '2020-10-06 15:45:13.107'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5efd66e3bceb0900446a4243',
        article: 'FA-0000025',
        name: 'Большой плюшевый медведь "Томми" Россия',
        priceRub: 1990,
        priceStoreRub: 0,
        condition: 'used',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [],
        photoIds: [
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId()
        ],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c9107638d13dd33822957_12395bee-d892-40e3-b599-f1455a493254.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c9107638d13dd33822957_60a9d300-cefa-445f-9215-35eb796f904e_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:14.119',
        modified: '2020-10-06 15:45:14.131'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5e58a4e5bd36c04a7842d076',
        article: 'FA-0000026',
        name: 'Кот Басик большой 30 см. Ассортимент 33 позиции',
        priceRub: 1990,
        priceStoreRub: 0,
        condition: 'used',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [],
        photoIds: [
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId()
        ],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c9107638d13dd33822957_26463e6c-8481-47e1-ba30-c816931c1b59.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c9107638d13dd33822957_a51f0bc3-c387-45fb-9f24-86505594dafa_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:16.084',
        modified: '2020-10-06 15:45:16.098'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5f59b04c418e3e02fe73a22a',
        article: 'FA-0000027',
        name: 'Гигантский плюшевый медведь "Цезарь" 250 см',
        priceRub: 14000,
        priceStoreRub: 0,
        condition: 'used',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [],
        photoIds: [
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId()
        ],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c910c638d13dd33822981_cc0a9438-c07b-49ec-bc0b-4a0550366bd6.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c910c638d13dd33822981_43a64c3b-dfb1-4a22-bfda-b7e36b908e2f_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:17.735',
        modified: '2020-10-06 15:45:17.748'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5e7a2aa3f6957654d91836c9',
        article: 'FA-0000028',
        name: 'Кот подушка Басик 40 см',
        priceRub: 1990,
        priceStoreRub: 0,
        condition: 'used',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [],
        photoIds: [
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId()
        ],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c9107638d13dd33822957_0b00b2dd-b444-4f1f-b90e-e7205bc678de.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c9107638d13dd33822957_effbc264-29a2-4e6e-b27e-49453550ed9a_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:18.811',
        modified: '2020-10-06 15:45:18.824'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5e70962ade8854a7871e49b1',
        article: 'FA-0000029',
        name: 'Добрые Зверьки "Mini Twini" 20 см',
        priceRub: 850,
        priceStoreRub: 0,
        condition: 'used',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [],
        photoIds: [
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId()
        ],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c9107638d13dd33822957_f1597637-5662-4a88-a845-19527b06de54.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c9107638d13dd33822957_27f4c68b-e9c1-4e31-8fbe-5b29f7682e9d_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:19.956',
        modified: '2020-10-06 15:45:19.972'
    },
    {
        _id: new ObjectId(),
        status: 'active',
        type: 'client',
        supplierId: '5f013fdab269315de706c29b',
        article: 'FA-0000030',
        name: 'Мишки для Влюблённых "Томми" 200 см',
        priceRub: 6990,
        priceStoreRub: 0,
        condition: 'used',
        cityId: new ObjectId(),
        areaId: '',
        address: '',
        isExchangePossible: false,
        isPack: false,
        isLuxe: false,
        description: 'description',
        clientId: new ObjectId(),
        moderated: '',
        categoryId: new ObjectId(),
        subCategoryId: new ObjectId(),
        attributes: [],
        photoIds: [
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId(),
            new ObjectId()
        ],
        rejectionReasons: [],
        cloudUrl: 'https://190915.selcdn.ru/fango-qa/5f7c9107638d13dd33822957_18ce55dc-bfbd-4282-b7e9-e073c4e70096.jpeg',
        cloudPreviewUrl:
        'https://190915.selcdn.ru/fango-qa/5f7c9107638d13dd33822957_213d2e2c-8218-4d3b-b919-d34205b4637b_preview.jpeg',
        createdBy: 'import',
        updatedBy: 'import',
        rating: 0,
        viewsCount: 0,
        created: '2020-10-06 15:45:21.196',
        modified: '2020-10-06 15:45:21.209'
    }
];
