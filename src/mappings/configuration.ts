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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const charFilter = {
    e_mapping: {
        type: 'mapping',
        mappings: ['ё=>е', 'Ё=>Е']
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const filters = {
    // russian stop words and russian grammar
    russianStop: {
        type: 'stop',
        stopwords: '_russian_'
    },
    russianStemmer: {
        type: 'stemmer',
        language: 'russian'
    }

    //  #TODO: search for Джонсонс Бэби and find Johnson Baby
    // phoneticCyrillic: {
    //     type: 'phonetic',
    //     encoder: 'beider_morse',
    //     ['rule_type']: 'approx',
    //     ['name_type']: 'generic',
    //     ['languageset']: ['cyrillic']
    // },
    // phoneticEnglish: {
    //     type: 'phonetic',
    //     encoder: 'beider_morse',
    //     ['rule_type']: 'approx',
    //     ['name_type']: 'generic',
    //     languageset: ['english']
    // }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const analyzers = {
    russianSimple: {
        type: 'custom',
        tokenizer: 'standard',
        char_filter: ['e_mapping'],
        filter: ['lowercase', 'russianStop', 'russianStemmer']
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {analyzers, filters, charFilter};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
