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

module.exports = {
    plugins: [
        'promise'
    ],
    rules: {
        // enforce using bluebird promise
        'promise/no-native': ['error']
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
