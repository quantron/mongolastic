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
        es6: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    plugins: [
        'import'
    ],

    settings: {
        'import/resolver': {
            node: {
                extensions: ['.mjs', '.js', '.json']
            }
        },
        'import/extensions': [
            '.js',
            '.mjs',
            '.jsx'
        ],
        'import/core-modules': [],
        'import/ignore': [
            'node_modules',
            '\\.(coffee|scss|css|less|hbs|svg|json)$',
            'models/index'
        ]
    },

    rules: {
        // Static analysis:

        // ensure imports point to files/modules that can be resolved
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unresolved.md
        'import/no-unresolved': ['error', {commonjs: true, caseSensitive: true}],

        // ensure named imports coupled with named exports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md#when-not-to-use-it
        'import/named': 'error',

        // Helpful warnings:

        // disallow invalid exports, e.g. multiple defaults
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md
        'import/export': 'error',

        // do not allow a default import name to match a named export
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
        'import/no-named-as-default': 'error',

        // warn on accessing default export property names that are also named exports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default-member.md
        'import/no-named-as-default-member': 'error',

        // Forbid mutable exports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
        'import/no-mutable-exports': 'error',

        // Module systems:

        // disallow AMD require/define
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md
        'import/no-amd': 'error',

        // Style guide:

        // disallow non-import statements appearing before import statements
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
        'import/first': 'error',

        // disallow duplicate imports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
        'import/no-duplicates': 'error',

        // Ensure consistent use of file extension within the import path
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            mjs: 'never',
            jsx: 'never'
        }],

        // ensure absolute imports are above relative imports and that unassigned imports are ignored
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
        // TODO: enforce a stricter convention in module import order?
        'import/order': ['error', {groups: [['builtin', 'external', 'internal']]}],

        // Require a newline after the last import/require in a group
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
        'import/newline-after-import': 'error',

        // Require modules with a single export to use a default export
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
        'import/prefer-default-export': 'off',

        // Forbid import of modules using absolute paths
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
        'import/no-absolute-path': 'error',

        // Forbid require() calls with expressions
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
        'import/no-dynamic-require': 'error',

        // Forbid Webpack loader syntax in imports
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md
        'import/no-webpack-loader-syntax': 'error',

        // Prevent importing the default as if it were named
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md
        'import/no-named-default': 'error',

        // Forbid a module from importing itself
        // https://github.com/benmosher/eslint-plugin-import/blob/44a038c06487964394b1e15b64f3bd34e5d40cde/docs/rules/no-self-import.md
        'import/no-self-import': 'error',

        // Forbid cyclical dependencies between modules
        // https://github.com/benmosher/eslint-plugin-import/blob/d81f48a2506182738409805f5272eff4d77c9348/docs/rules/no-cycle.md
        'import/no-cycle': ['error', {maxDepth: Infinity}],

        // Ensures that there are no useless path segments
        // https://github.com/benmosher/eslint-plugin-import/blob/ebafcbf59ec9f653b2ac2a0156ca3bcba0a7cf57/docs/rules/no-useless-path-segments.md
        'import/no-useless-path-segments': 'error',

        // #TODO: enable?
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/unambiguous.md
        'import/unambiguous': ['off']
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
