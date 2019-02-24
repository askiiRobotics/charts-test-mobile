/**
 * predefined system values
 */
'use strict';

// eslint-disable-next-line import/prefer-default-export
export const RequestStatus = Object.freeze({
    FETCHING:   Symbol('fetching'),
    SUCCESS:  Symbol('success'),
    ERROR: Symbol('error')
});

export const CURRENT_STATE_VERSION = 2; // force persist to update current version os saved state in a case of critical update