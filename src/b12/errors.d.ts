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
export interface ServerError extends Error {
    type: string;
    name: string;
    message: string;
    extraData: Record<string, unknown>;
    stack?: string;
}

export interface ErrorsMap {
    [key: string]: ServerError;
}

export interface ErrorsDescriptionMap {
    [key: string]: {
        type: string;
        name: string;
        message: string;
    };
}

export function getError(): keyof ErrorsMap;
export function getErrorDescriptionsMap(): keyof ErrorsDescriptionMap;
export declare function declareError(name: string, type: string, defaultMessage: string, Base?: Error): ServerError;

export const Internal: ServerError;
