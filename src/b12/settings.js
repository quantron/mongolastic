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

import fs from 'fs';
import path from 'path';
import _ from 'lodash';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function processError(message) {
    console.error('settings: ', message);
    throw Error(message);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CONFIG_PATH = path.resolve(__dirname, '..', '..', 'config.json');
const LOCAL_CONFIG_PATH = path.resolve(__dirname, '..', '..', 'config.local.json');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function read() {
    let defaultSettingsString = '';
    let settings = null;

    let localSettingsString = '';
    let localSettings = null;
    try {
        console.info('settings.read(): reading default config file...');
        defaultSettingsString = fs.readFileSync(CONFIG_PATH);
    } catch(error) {
        processError(`cannot read default settings file - ${error.toString()}`);
    }

    try {
        settings = JSON.parse(defaultSettingsString);
    } catch(error) {
        processError(`cannot parse default settings file - ${error.toString()}`);
    }

    settings.getValue = (name, defaultValue) => {
        if(!_.has(settings, name)) {
            console.warn(`settings.getValue(): no ${name} record in settings.`);
            return defaultValue;
        }
        return settings[name];
    };

    if(!fs.existsSync(LOCAL_CONFIG_PATH)) {
        return settings;
    }

    try {
        console.info('settings.read(): reading local config file...');
        localSettingsString = fs.readFileSync(LOCAL_CONFIG_PATH);
    } catch(error) {
        processError(`cannot read local settings file - ${error.toString()}`);
    }

    try {
        localSettings = JSON.parse(localSettingsString);
    } catch(error) {
        processError(`error on local settings file parsing - ${error.toString()}`);
    }

    settings = _.defaults(localSettings, settings);

    return settings;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function readFromFile(path) {
    try {
        console.info(`settings.readFromFile(): reading config file - ${path}`);
        const settingsString = fs.readFileSync(path);
        const settings = JSON.parse(settingsString);
        return settings;
    } catch(error) {
        processError(`cannot read settings file - ${error.toString()}`);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let settings = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function get() {
    if(!settings) {
        settings = read();
    }
    return settings;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getPath(settingPath, defaultValue) {
    if(!settings) {
        settings = read();
    }
    return settingPath ? _.get(settings, settingPath, defaultValue) : settings;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export {read, readFromFile, get, getPath};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default getPath;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
