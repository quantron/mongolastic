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

import {inherits} from 'util';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const errorsMap = {};
const errorDescriptionsMap = {};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getError(type) {
    return errorsMap[type];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getErrorDescriptionsMap() {
    return errorDescriptionsMap;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function declareError(name, type, defaultMessage, Base = Error) {
    if(!name) throw new Error('Error must have name');
    if(!type) throw new Error('Error must have type');
    function ServerError(message, extraData) {
        if(!(this instanceof ServerError)) {
            return new ServerError(message, extraData);
        }
        Error.captureStackTrace(this, ServerError);
        this.type = type;
        this.name = name;
        this.message = message || defaultMessage || '';
        this.extraData = extraData || {};
    }
    ServerError.prototype[Symbol.toStringTag] = 'Error';

    ServerError.prototype.toString = function toString() {
        return `${this.name}: ${this.message}`;
    };

    inherits(ServerError, Base);

    errorsMap[type] = ServerError;
    errorDescriptionsMap[type] = {
        type,
        name,
        message: defaultMessage
    };
    return ServerError;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const InternalError = declareError('InternalError', 'internal', 'Internal error');
const NotFoundError = declareError('NotFoundError', 'not_found', 'Object does not exist');
const InvalidParameterError = declareError('InvalidParameterError', 'invalid_parameter', 'Invalid Parameter');
const AlreadyExistsError = declareError('AlreadyExistsError', 'already_exists', 'Record already exists');
const FileTooLargeError = declareError('FileTooLargeError', 'file_too_large', 'File is too large');
const WrongCaptchaError = declareError('WrongCaptchaError', 'wrong_captcha', 'Wrong captcha');
const InsufficientPrivilegesError = declareError(
    'InsufficientPrivilegesError',
    'insufficient_privileges',
    'Not authorized to do this.'
);
const NoRightError = declareError('NoRightError', 'no_right', 'User has no right for this action.');
const NotAllowedError = declareError('NotAllowedError', 'not_allowed', 'User not allowed to perform this action.');
const ObjectInUseError = declareError('ObjectInUseError', 'object_in_use', 'Object is in use.');
const NotImplementedError = declareError(
    'NotImplementedError',
    'not_implemented',
    'This functionality not implemented.',
    InternalError
);
const SslRequiredError = declareError(
    'SslRequiredError',
    'ssl_required',
    'SSL connection required for this method.',
    InternalError
);
const InvalidSessionError = declareError('InvalidSessionError', 'invalid_session', 'Invalid session.');
const InvalidUserError = declareError('InvalidUserError', 'invalid_user', 'Invalid user or password.');
const DisabledUserError = declareError('DisabledUserError', 'disabled_user', 'Disabled user.');
const WeakPasswordError = declareError('WeakPasswordError', 'weak_password', 'Password is too weak.');
const ClientBannedError = declareError('ClientBannedError', 'client_banned', 'User is banned by another person.');
const FakeEmailError = declareError('FakeEmailError', 'fake_email', 'User has fake email.');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const quietErrors = ['no_rate', 'no_money', 'not_allowed', 'no_profile_photo', 'weak_profile', 'client_banned'];
const warnErrors = [
    'invalid_parameter', 'invalid_user', 'already_exists', 'invalid_session',
    'email_not_confirmed', 'invalid_promocode', 'not_found'
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default {
    Internal: InternalError,
    NotFound: NotFoundError,
    InvalidParameter: InvalidParameterError,
    AlreadyExists: AlreadyExistsError,
    FileToLarge: FileTooLargeError,
    WrongCaptcha: WrongCaptchaError,
    InsufficientPrivileges: InsufficientPrivilegesError,
    NoRight: NoRightError,
    NotAllowed: NotAllowedError,
    ObjectInUse: ObjectInUseError,
    NotImplemented: NotImplementedError,
    SslRequired: SslRequiredError,
    InvalidSession: InvalidSessionError,
    InvalidUser: InvalidUserError,
    DisabledUser: DisabledUserError,
    WeakPassword: WeakPasswordError,
    ClientBanned: ClientBannedError,
    FakeEmail: FakeEmailError,

    declareError,
    getError,
    getErrorDescriptionsMap,

    quietErrors,
    warnErrors
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
