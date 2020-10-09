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
    rules: {
        // enforce spacing inside array brackets
        'array-bracket-spacing': ['error', 'never'],

        // enforce spacing inside single-line blocks
        // https://eslint.org/docs/rules/block-spacing
        'block-spacing': ['error', 'always'],

        // enforce one true brace style
        'brace-style': ['error', '1tbs', {allowSingleLine: true}],

        // require camel case names
        camelcase: ['error', {properties: 'never', ignoreDestructuring: true}],

        // enforce spacing before and after comma
        'comma-spacing': ['error', {before: false, after: true}],

        // enforce one true comma style
        'comma-style': ['error', 'last', {
            exceptions: {
                ArrayExpression: false,
                ArrayPattern: false,
                ArrowFunctionExpression: false,
                CallExpression: false,
                FunctionDeclaration: false,
                FunctionExpression: false,
                ImportDeclaration: false,
                ObjectExpression: false,
                ObjectPattern: false,
                VariableDeclaration: false,
                NewExpression: false
            }
        }],

        'comma-dangle': ['error', 'never'],

        // disallow padding inside computed properties
        'computed-property-spacing': ['error', 'never'],

        // enforces consistent naming when capturing the current execution context
        'consistent-this': ['error', 'that'],

        // enforce newline at the end of file, with no multiple empty lines
        'eol-last': ['error', 'always'],

        // enforce spacing between functions and their invocations
        // https://eslint.org/docs/rules/func-call-spacing
        'func-call-spacing': ['error', 'never'],

        // require function expressions to have a name
        // https://eslint.org/docs/rules/func-names
        'func-names': 'error',

        // enforce consistent line breaks inside function parentheses
        // https://eslint.org/docs/rules/function-paren-newline
        'function-paren-newline': ['error', 'consistent'],

        // this option enforces minimum and maximum identifier lengths
        // (variable names, property names etc.)
        'id-length': 'off',

        // this option sets a specific tab width for your code
        // https://eslint.org/docs/rules/indent
        indent: ['error', 4, {
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

        // specify whether double or single quotes should be used in JSX attributes
        // https://eslint.org/docs/rules/jsx-quotes
        'jsx-quotes': ['warn', 'prefer-single'],

        // enforces spacing between keys and values in object literal properties
        'key-spacing': ['error', {beforeColon: false, afterColon: true}],

        // require a space before & after certain keywords
        'keyword-spacing': ['error', {
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

        // disallow mixed 'LF' and 'CRLF' as linebreaks
        // https://eslint.org/docs/rules/linebreak-style
        'linebreak-style': ['error', 'unix'],

        // require or disallow an empty line between class members
        // https://eslint.org/docs/rules/lines-between-class-members
        'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: false}],

        // require or disallow newlines around directives
        // https://eslint.org/docs/rules/lines-around-directive
        'lines-around-directive': ['error', {
            before: 'always',
            after: 'always'
        }],

        // specify the maximum depth that blocks can be nested
        'max-depth': ['error', 4],

        // specify the maximum length of a line in your program
        // https://eslint.org/docs/rules/max-len
        'max-len': ['error', 120, 2, {
            ignoreUrls: true,
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true
        }],

        // specify the max number of lines in a file
        // https://eslint.org/docs/rules/max-lines
        // #TODO: consider enabling
        'max-lines': ['off', {
            max: 300,
            skipBlankLines: true,
            skipComments: true
        }],

        // enforce a maximum function length
        // https://eslint.org/docs/rules/max-lines-per-function
        // #TODO: consider enabling
        'max-lines-per-function': ['off', {
            max: 50,
            skipBlankLines: true,
            skipComments: true,
            IIFEs: true
        }],

        // specify the maximum depth callbacks can be nested
        'max-nested-callbacks': 'error',

        // limits the number of parameters that can be used in the function declaration.
        'max-params': ['error', 6],

        // specify the maximum number of statement allowed in a function
        'max-statements': ['error', 30, {ignoreTopLevelFunctions: true}],

        // require a capital letter for constructors
        'new-cap': ['error', {
            newIsCap: true,
            newIsCapExceptions: [],
            capIsNew: false,
            capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List']
        }],

        // disallow the omission of parentheses when invoking a constructor with no arguments
        // https://eslint.org/docs/rules/new-parens
        'new-parens': 'error',

        // enforces new line after each method call in the chain to make it
        // more readable and easy to maintain
        // https://eslint.org/docs/rules/newline-per-chained-call
        'newline-per-chained-call': ['error', {ignoreChainWithDepth: 4}],

        // disallow use of the Array constructor
        'no-array-constructor': 'error',

        // disallow if as the only statement in an else block
        // https://eslint.org/docs/rules/no-lonely-if
        'no-lonely-if': 'error',

        // disallow un-paren'd mixes of different operators
        // https://eslint.org/docs/rules/no-mixed-operators
        'no-mixed-operators': ['error', {
            // the list of arthmetic groups disallows mixing `%` and `**`
            // with other arithmetic operators.
            groups: [
                ['%', '**'],
                ['%', '+'],
                ['%', '-'],
                ['%', '*'],
                ['%', '/'],
                ['**', '+'],
                ['**', '-'],
                ['**', '*'],
                ['**', '/'],
                ['&', '|', '^', '~', '<<', '>>', '>>>'],
                ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                ['&&', '||'],
                ['in', 'instanceof']
            ],
            allowSamePrecedence: false
        }],

        // disallow mixed spaces and tabs for indentation
        'no-mixed-spaces-and-tabs': 'error',

        // disallow use of chained assignment expressions
        // https://eslint.org/docs/rules/no-multi-assign
        'no-multi-assign': ['error'],

        // disallow multiple empty lines and only one newline at the end
        'no-multiple-empty-lines': ['error', {max: 2, maxEOF: 0}],

        // disallow nested ternary expressions
        'no-nested-ternary': 'error',

        // disallow use of the Object constructor
        'no-new-object': 'error',

        // disallow use of unary operators, ++ and --
        // https://eslint.org/docs/rules/no-plusplus
        'no-plusplus': 'error',

        // disallow certain syntax forms
        // https://eslint.org/docs/rules/no-restricted-syntax
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForInStatement',
                message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
            },
            {
                selector: 'ForOfStatement',
                message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.'
            },
            {
                selector: 'LabeledStatement',
                message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
            },
            {
                selector: 'WithStatement',
                message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
            }
        ],

        // disallow space between function identifier and application
        'no-spaced-func': 'error',

        // disallow trailing whitespace at the end of lines
        'no-trailing-spaces': ['error', {
            skipBlankLines: false,
            ignoreComments: false
        }],

        // disallow dangling underscores in identifiers
        // https://eslint.org/docs/rules/no-underscore-dangle
        'no-underscore-dangle': ['off', {
            allow: ['_id', '__id'],
            allowAfterThis: false,
            allowAfterSuper: false,
            enforceInMethodNames: true
        }],

        // disallow the use of Boolean literals in conditional expressions
        // also, prefer `a || b` over `a ? a : b`
        // https://eslint.org/docs/rules/no-unneeded-ternary
        'no-unneeded-ternary': ['error', {defaultAssignment: false}],

        // disallow whitespace before properties
        // https://eslint.org/docs/rules/no-whitespace-before-property
        'no-whitespace-before-property': 'error',

        // enforce the location of single-line statements
        // https://eslint.org/docs/rules/nonblock-statement-body-position
        'nonblock-statement-body-position': ['error', 'beside', {overrides: {}}],

        // require padding inside curly braces
        'object-curly-spacing': ['error', 'never'],

        // enforce line breaks between braces
        // https://eslint.org/docs/rules/object-curly-newline
        'object-curly-newline': ['off', {
            ObjectExpression: {minProperties: 6, multiline: true, consistent: true},
            ObjectPattern: {minProperties: 6, multiline: true, consistent: true},
            ImportDeclaration: {minProperties: 6, multiline: true, consistent: true},
            ExportDeclaration: {minProperties: 6, multiline: true, consistent: true}
        }],

        // enforce "same line" or "multiple line" on object properties.
        // https://eslint.org/docs/rules/object-property-newline
        'object-property-newline': ['error', {
            allowAllPropertiesOnSameLine: true
        }],

        // allow just one var statement per function
        'one-var': ['error', 'never'],

        // require a newline around variable declaration
        // https://eslint.org/docs/rules/one-var-declaration-per-line
        'one-var-declaration-per-line': ['error', 'always'],

        // require assignment operator shorthand where possible or prohibit it entirely
        // https://eslint.org/docs/rules/operator-assignment
        'operator-assignment': ['error', 'always'],

        // Requires operator at the beginning of the line in multiline statements
        // https://eslint.org/docs/rules/operator-linebreak
        'operator-linebreak': ['error', 'before', {overrides: {'=': 'none'}}],

        // disallow padding within blocks
        'padded-blocks': [
            'error',
            {
                blocks: 'never',
                classes: 'never',
                switches: 'never'
            },
            {allowSingleLineBlocks: true}
        ],

        // require quotes around object literal property names
        // https://eslint.org/docs/rules/quote-props.html
        'quote-props': ['error', 'as-needed', {keywords: false, unnecessary: true, numbers: false}],

        // specify whether double or single quotes should be used
        quotes: ['error', 'single', {avoidEscape: true}],


        // require or disallow use of semicolons instead of ASI
        semi: ['error', 'always'],

        // enforce spacing before and after semicolons
        'semi-spacing': ['error', {before: false, after: true}],

        // Enforce location of semicolons
        // https://eslint.org/docs/rules/semi-style
        'semi-style': ['error', 'last'],

        // require or disallow space before blocks
        'space-before-blocks': 'error',

        // require or disallow space before function opening parenthesis
        // https://eslint.org/docs/rules/space-before-function-paren
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'never'
        }],

        // require or disallow spaces inside parentheses
        'space-in-parens': ['error', 'never'],

        // require spaces around operators
        'space-infix-ops': 'error',

        // Require or disallow spaces before/after unary operators
        // https://eslint.org/docs/rules/space-unary-ops
        'space-unary-ops': ['error', {
            words: true,
            nonwords: false,
            overrides: {
            }
        }],

        // require or disallow a space immediately following the // or /* in a comment
        // https://eslint.org/docs/rules/spaced-comment
        'spaced-comment': ['error', 'always', {exceptions: ['/']}],

        // Enforce spacing around colons of switch statements
        // https://eslint.org/docs/rules/switch-colon-spacing
        'switch-colon-spacing': ['error', {after: true, before: false}],

        // Require or disallow spacing between template tags and their literals
        // https://eslint.org/docs/rules/template-tag-spacing
        'template-tag-spacing': ['error', 'never'],

        // require or disallow the Unicode Byte Order Mark
        // https://eslint.org/docs/rules/unicode-bom
        'unicode-bom': ['error', 'never']
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
