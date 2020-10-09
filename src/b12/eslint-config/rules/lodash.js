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

// https://github.com/wix/eslint-plugin-lodash

module.exports = {
    plugins: [
        'lodash'
    ],
    rules: {

        // use or avoid thisArg for Lodash method callbacks
        // https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/callback-binding.md
        'lodash/callback-binding': 'error',

        // enforce a specific chain style: explicit, implicit, or explicit only when necessary.
        // https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/chain-style.md
        // #TODO probably should be avoided in favor to _.flow
        // https://medium.com/making-internets/why-using-chain-is-a-mistake-9bc1f80d51ba
        'lodash/chain-style': ['off', 'as-needed'],

        // prefer using _.flow over chain
        // https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/chaining.md
        'lodash/chaining': ['warn', 'never'],

        // always return a value in iteratees of Lodash collection methods that aren't forEach.
        'lodash/collection-return': 'error',


        // prefer identity shorthand syntax
        'lodash/identity-shorthand': ['error', 'always'],

        // prefer matches property shorthand syntax
        'lodash/matches-prop-shorthand': ['error', 'always'],

        // prefer matches shorthand syntax, 3 = maximum path length
        'lodash/matches-shorthand': ['error', 'always', 3],

        // do not use .commit() on chains that should end with .value()
        'lodash/no-commit': 'error',

        // do not use .value() on chains that have already ended (e.g. with max() or reduce()) (fixable)
        'lodash/no-double-unwrap': 'error',

        // do not use superfluous arguments on Lodash methods with a specified arity.
        'lodash/no-extra-args': 'error',

        // lodash/path-style: ['error', 'as-needed'],

        // prefer _.compact over _.filter for only truthy values.
        'lodash/prefer-compact': 'error',

        // prefer _.constant over functions returning literals.
        'lodash/prefer-constant': 'error',

        // prefer _.filter over _.forEach with an if statement inside.
        // 3 = maximum path length
        'lodash/prefer-filter': ['error', 3],

        // prefer _.flatMap over consecutive map and flatten.
        'lodash/prefer-flat-map': 'error',

        // prefer using _.get or _.has over expression chains like a && a.b && a.b.c.
        'lodash/prefer-get': ['error', 3],

        // prefer using _.invoke over _.map with a method call inside
        'lodash/prefer-invoke-map': 'error',

        // prefer _.isNil over checks for both null and undefined
        'lodash/prefer-is-nil': 'error',

        // prefer using Lodash chains (e.g. _.map) over native and mixed chains.
        'lodash/prefer-lodash-chain': 'error',

        // prefer using Lodash collection methods (e.g. _.map) over native array methods.
        'lodash/prefer-lodash-method': [
            'error',
            {ignoreMethods: ['slice', 'replace', 'toLower', 'find', 'split'], ignoreObjects: ['async', 'fp', 'Promise']}
        ],

        // prefer using _.is* methods over typeof and instanceof checks when applicable.
        'lodash/prefer-lodash-typecheck': 'error',

        // prefer _.map over _.forEach with a push inside.
        'lodash/prefer-map': 'error',

        // prefer _.matches over conditions like a.foo === 1 && a.bar === 2 && a.baz === 3.
        'lodash/prefer-matches': ['error', 3],

        // prefer _.noop over empty functions.
        'lodash/prefer-noop': 'error',

        // prefer _.overSome and _.overEvery instead of checks with && and || for methods that have a boolean check iteratee.
        'lodash/prefer-over-quantifier': 'error',

        // prefer _.reject over filter with !(expression) or x.prop1 !== value
        'lodash/prefer-reject': ['error', 3],

        // prefer _.startsWith over a.indexOf(b) === 0.
        'lodash/prefer-startswith': 'error',

        // prefer using _.prototype.thru in the chain and not call functions in the initial value, e.g. _(x).thru(f).map(g)...
        'lodash/prefer-thru': 'error',

        // prefer _.times over _.map without using the iteratee's arguments.
        'lodash/prefer-times': 'error',

        // prefer using array and string methods in the chain and not the initial value, e.g. _(str).split(' ')...
        'lodash/prefer-wrapper-method': 'error',

        // 'lodash/preferred-alias': 'error',

        // Use property shorthand syntax
        'lodash/prop-shorthand': ['error', 'always'],

        // prevent chaining without evaluation via value() or non-chainable methods like max().,
        'lodash/unwrap': 'error'
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
