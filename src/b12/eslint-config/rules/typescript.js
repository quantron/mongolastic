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

// some rules doesn't work in typescript
module.exports = {
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    settings: {
        // Apply special parsing for TypeScript files
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts']
        },
        // Append 'ts' extensions to 'import/resolver' setting
        'import/resolver': {
            node: {
                extensions: ['.mjs', '.js', '.ts', '.json']
            }
        },
        // Append 'ts' extensions to 'import/extensions' setting
        'import/extensions': ['.js', '.ts', '.mjs']
    },
    rules: {
        // Replace eslint 'brace-style' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
        'brace-style': 'off',
        '@typescript-eslint/brace-style': ['error', '1tbs', {allowSingleLine: true}],

        // Replace eslint 'camelcase' rule with '@typescript-eslint/naming-convention'
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
        camelcase: 'off',
        // The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings. However, the existing `no-underscore-dangle` rule already takes care of this.
        '@typescript-eslint/naming-convention': [
            'error',
            // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
            {
                selector: 'variable',
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow'
            },
            // Allow camelCase functions (23.2), and PascalCase functions (23.8)
            {
                selector: 'function',
                format: ['camelCase', 'PascalCase']
            },
            // eslint recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
            {
                selector: 'typeLike',
                format: ['PascalCase']
            },
            {
                selector: ['property', 'parameterProperty'],
                format: ['camelCase', 'snake_case', 'PascalCase'],
                leadingUnderscore: 'allow'
            }
        ],
        // Replace eslint 'comma-spacing' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
        'comma-spacing': 'off',
        '@typescript-eslint/comma-spacing': ['error', {before: false, after: true}],

        // Replace eslint 'dot-notation' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': ['error', {allowKeywords: true}],

        // Replace eslint 'func-call-spacing' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
        'func-call-spacing': 'off',
        '@typescript-eslint/func-call-spacing': ['error', 'never'],

        // Replace eslint 'indent' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            // MemberExpression: null,
            FunctionDeclaration: {
                parameters: 1,
                body: 1
            },
            FunctionExpression: {
                parameters: 1,
                body: 1
            },
            CallExpression: {
                arguments: 1
            },
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
            ignoredNodes: ['JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
            ignoreComments: false
        }],

        // Replace eslint 'keyword-spacing' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
        'keyword-spacing': 'off',
        '@typescript-eslint/keyword-spacing': ['error', {
            before: true,
            after: true,
            overrides: {
                if: {after: false},
                for: {after: false},
                while: {after: false},
                switch: {after: false},
                catch: {after: false},
                return: {after: true},
                throw: {after: true},
                case: {after: true}
            }
        }],

        // Replace eslint 'lines-between-class-members' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
        'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: false}],

        // Replace eslint 'no-array-constructor' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'error',

        // Replace eslint 'no-dupe-class-members' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
        'no-dupe-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': 'error',

        // Replace eslint 'no-empty-function' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'error',

        // Replace eslint 'no-extra-semi' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
        'no-extra-semi': 'off',
        '@typescript-eslint/no-extra-semi': 'error',

        // Replace eslint 'no-implied-eval' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
        'no-implied-eval': 'off',
        '@typescript-eslint/no-implied-eval': 'error',

        // Replace eslint 'no-magic-numbers' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': [
            'warn',
            {
                ignore: [],
                ignoreArrayIndexes: true,
                enforceConst: true,
                detectObjects: false
            }
        ],

        // Replace eslint 'no-throw-literal' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
        'no-throw-literal': 'off',
        '@typescript-eslint/no-throw-literal': 'error',

        // Replace eslint 'no-unused-expressions' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
            'error',
            {
                allowShortCircuit: false,
                allowTernary: false,
                allowTaggedTemplates: false
            }
        ],

        // Replace eslint 'no-unused-vars' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', {vars: 'all', args: 'after-used', ignoreRestSiblings: true}],

        // Replace eslint 'no-use-before-define' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error', {functions: false, classes: true, variables: true}],

        // Replace eslint 'no-useless-constructor' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',

        // Replace eslint 'quotes' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
        quotes: 'off',
        '@typescript-eslint/quotes': ['error', 'single', {avoidEscape: true}],

        // Replace eslint 'semi' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
        semi: 'off',
        '@typescript-eslint/semi': ['error', 'always'],

        // Replace eslint 'space-before-function-paren' rule with '@typescript-eslint' version
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'never'
        }],

        // Append 'ts' and 'tsx' to eslint 'import/extensions' rule
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                mjs: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ]
    }
};
