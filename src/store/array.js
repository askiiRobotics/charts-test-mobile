
/**
 * tool for processing arrays in redux
 *
 * @format
 * @flow
 */
'use strict';

// tslint:disable-next-line:export-name
export default () => next => action =>
action ?
  (Array.isArray(action)
    ? action.map(next)
    : next(action))
    : null;
