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
        // enforces return statements in callbacks of array's methods
        // https://eslint.org/docs/rules/array-callback-return
        'array-callback-return': ['error', {allowImplicit: true}],

        // treat var statements as if they were block scoped
        'block-scoped-var': 'error',

        // specify the maximum cyclomatic complexity allowed in a program
        complexity: 'error',

        // require return statements to either always or never specify values
        // #TODO: should be error?
        'consistent-return': 'off',

        // specify curly brace conventions for all control statements
        curly: ['error', 'multi-line'],

        // require default case in switch statements
        'default-case': ['error', {commentPattern: '^no default$'}],

        // encourages use of dot notation whenever possible
        'dot-notation': ['error', {allowKeywords: true}],

        // enforces consistent newlines before or after dots
        // https://eslint.org/docs/rules/dot-location
        'dot-location': ['error', 'property'],

        // require the use of === and !==
        // https://eslint.org/docs/rules/eqeqeq
        eqeqeq: ['error', 'always', {null: 'ignore'}],

        // make sure for-in loops have an if statement
        'guard-for-in': 'error',

        // enforce a maximum number of classes per file
        // https://eslint.org/docs/rules/max-classes-per-file
        'max-classes-per-file': ['warn', 1],

        // disallow the use of alert, confirm, and prompt
        'no-alert': 'warn',

        // disallow use of arguments.caller or arguments.callee
        'no-caller': 'error',

        // disallow lexical declarations in case/default clauses
        // https://eslint.org/docs/rules/no-case-declarations.html
        'no-case-declarations': 'error',

        // disallow else after a return in an if
        // https://eslint.org/docs/rules/no-else-return
        'no-else-return': ['error', {allowElseIf: false}],

        // disallow empty functions, except for standalone funcs/arrows
        // https://eslint.org/docs/rules/no-empty-function
        'no-empty-function': [
            'error',
            {
                allow: ['arrowFunctions', 'functions', 'methods']
            }
        ],

        // disallow empty destructuring patterns
        // https://eslint.org/docs/rules/no-empty-pattern
        'no-empty-pattern': 'error',

        // disallow use of eval()
        'no-eval': 'error',

        // disallow adding to native types
        'no-extend-native': 'error',

        // disallow unnecessary function binding
        'no-extra-bind': 'error',

        // disallow Unnecessary Labels
        // https://eslint.org/docs/rules/no-extra-label
        'no-extra-label': 'error',

        // disallow fallthrough of case statements
        'no-fallthrough': 'error',

        // disallow the use of leading or trailing decimal points in numeric literals
        'no-floating-decimal': 'error',

        // disallow reassignments of native objects or read-only globals
        // https://eslint.org/docs/rules/no-global-assign
        'no-global-assign': ['error', {exceptions: []}],

        // deprecated in favor of no-global-assign
        'no-native-reassign': 'error',

        // disallow var and named functions in global scope
        // https://eslint.org/docs/rules/no-implicit-globals
        'no-implicit-globals': 'error',

        // disallow use of eval()-like methods
        'no-implied-eval': 'error',

        // disallow usage of __iterator__ property
        'no-iterator': 'error',

        // disallow use of labels for anything other then loops and switches
        'no-labels': ['error', {allowLoop: false, allowSwitch: false}],

        // disallow unnecessary nested blocks
        'no-lone-blocks': 'error',

        // disallow creation of functions within loops
        'no-loop-func': 'error',

        // disallow magic numbers
        // https://eslint.org/docs/rules/no-magic-numbers
        // #TODO should set warn?
        'no-magic-numbers': [
            'off',
            {
                ignore: [],
                ignoreArrayIndexes: true,
                enforceConst: true,
                detectObjects: false
            }
        ],

        // disallow use of multiple spaces
        'no-multi-spaces': [
            'error',
            {
                ignoreEOLComments: false
            }
        ],

        // disallow use of multiline strings
        'no-multi-str': 'error',

        // disallow use of new operator when not part of the assignment or comparison
        'no-new': 'error',

        // disallow use of new operator for Function object
        'no-new-func': 'error',

        // disallows creating new instances of String, Number, and Boolean
        'no-new-wrappers': 'error',

        // disallow use of (old style) octal literals
        'no-octal': 'error',

        // disallow use of octal escape sequences in string literals, such as
        // var foo = 'Copyright \251';
        'no-octal-escape': 'error',

        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
        // rule: https://eslint.org/docs/rules/no-param-reassign.html
        'no-param-reassign': [
            'warn',
            {
                props: true,
                ignorePropertyModificationsFor: [
                    'acc', // for reduce accumulators
                    'result', // for reduce accumulators
                    'accumulator', // for reduce accumulators
                    'e', // for e.return value
                    'context', // for b12
                    'ctx', // for Koa routing
                    'req', // for Express requests
                    'request', // for Express requests
                    'res', // for Express responses
                    'response', // for Express responses
                    '$scope', // for Angular 1 scopes
                    'staticContext' // for ReactRouter context
                ]
            }
        ],

        // disallow usage of __proto__ property
        'no-proto': 'error',

        // disallow declaring the same variable more then once
        'no-redeclare': 'error',

        // disallow certain object properties
        // https://eslint.org/docs/rules/no-restricted-properties
        'no-restricted-properties': [
            'error',
            {
                object: 'arguments',
                property: 'callee',
                message: 'arguments.callee is deprecated'
            },
            {
                object: 'global',
                property: 'isFinite',
                message: 'Please use Number.isFinite instead'
            },
            {
                object: 'self',
                property: 'isFinite',
                message: 'Please use Number.isFinite instead'
            },
            {
                object: 'window',
                property: 'isFinite',
                message: 'Please use Number.isFinite instead'
            },
            {
                object: 'global',
                property: 'isNaN',
                message: 'Please use Number.isNaN instead'
            },
            {
                object: 'self',
                property: 'isNaN',
                message: 'Please use Number.isNaN instead'
            },
            {
                object: 'window',
                property: 'isNaN',
                message: 'Please use Number.isNaN instead'
            },
            {
                property: '__defineGetter__',
                message: 'Please use Object.defineProperty instead.'
            },
            {
                property: '__defineSetter__',
                message: 'Please use Object.defineProperty instead.'
            },
            {
                object: 'Math',
                property: 'pow',
                message: 'Use the exponentiation operator (**) instead.'
            }
        ],

        // disallow use of assignment in return statement
        'no-return-assign': ['error', 'always'],

        // disallow redundant `return await`
        'no-return-await': 'error',

        // disallow use of `javascript:` urls.
        'no-script-url': 'error',

        // disallow self assignment
        // https://eslint.org/docs/rules/no-self-assign
        'no-self-assign': [
            'error',
            {
                props: true
            }
        ],

        // disallow comparisons where both sides are exactly the same
        'no-self-compare': 'error',

        // disallow use of comma operator
        'no-sequences': 'error',

        // restrict what can be thrown as an exception
        'no-throw-literal': 'error',

        // disallow unmodified conditions of loops
        // https://eslint.org/docs/rules/no-unmodified-loop-condition
        'no-unmodified-loop-condition': 'error',

        // disallow usage of expressions in statement position
        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: false,
                allowTernary: false,
                allowTaggedTemplates: false
            }
        ],

        // disallow unused labels
        // https://eslint.org/docs/rules/no-unused-labels
        'no-unused-labels': 'error',

        // disallow unnecessary .call() and .apply()
        'no-useless-call': 'error',

        // Disallow unnecessary catch clauses
        // https://eslint.org/docs/rules/no-useless-catch
        'no-useless-catch': 'error',

        // disallow useless string concatenation
        // https://eslint.org/docs/rules/no-useless-concat
        'no-useless-concat': 'error',

        // disallow unnecessary string escaping
        // https://eslint.org/docs/rules/no-useless-escape
        'no-useless-escape': 'off',

        // disallow redundant return; keywords
        // https://eslint.org/docs/rules/no-useless-return
        'no-useless-return': 'error',

        // disallow use of void operator
        // https://eslint.org/docs/rules/no-void
        'no-void': ['error', {allowAsStatement: true}],

        // disallow use of the with statement
        'no-with': 'error',

        // require using Error objects as Promise rejection reasons
        // https://eslint.org/docs/rules/prefer-promise-reject-errors
        'prefer-promise-reject-errors': ['error', {allowEmptyReject: true}],

        // require use of the second argument for parseInt()
        radix: 'error',

        // requires to declare all vars on top of their containing scope
        'vars-on-top': 'error',

        // require immediate function invocation to be wrapped in parentheses
        // https://eslint.org/docs/rules/wrap-iife.html
        'wrap-iife': ['error', 'outside', {functionPrototypeMethods: false}],

        // require or disallow Yoda conditions
        yoda: 'error'
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////