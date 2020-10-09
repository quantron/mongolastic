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
    env: {
        node: true
    },

    rules: {
        // require all requires be top-level
        // https://eslint.org/docs/rules/global-require
        'global-require': 'off',

        // enforces error handling in callbacks (node environment)
        'handle-callback-err': 'error',

        // disallow use of the Buffer() constructor
        // https://eslint.org/docs/rules/no-buffer-constructor
        'no-buffer-constructor': 'error',

        // disallow mixing regular variable and require declarations
        'no-mixed-requires': 'error',

        // disallow use of new operator with the require function
        'no-new-require': 'error',

        // disallow string concatenation with __dirname and __filename
        // https://eslint.org/docs/rules/no-path-concat
        'no-path-concat': 'error',

        // restrict usage of specified node modules
        'no-restricted-modules': 'off'
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
