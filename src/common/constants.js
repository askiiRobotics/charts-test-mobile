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