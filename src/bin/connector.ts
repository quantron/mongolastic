#!/usr/bin/env node
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

import commander from 'commander';
import {start as startWatching} from '..';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
commander
    .description('CLI utility for mongo-elastic synchronization using mongo change-streams')
    .option('-c, --config [path]', 'provide custom config file')
    .action((cmdObject: commander.Command) => {
        startWatching(cmdObject.config)
            .then(() => {
                console.info('Listening started.');
            })
            .catch((error: Error) => {
                console.error('Error Creating MongoStream:', error);
                process.exit(1);
            });
    })
    .parse(process.argv);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
