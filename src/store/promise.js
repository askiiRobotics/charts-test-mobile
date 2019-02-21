
/**
 * tool for processing promises in redux
 *
 * @format
 * @flow
 */
'use strict';

function warn(error) {
  // eslint-disable-next-line no-console
  console.warn(error.message || error);
  throw error; // To let the caller handle the rejection
}

// tslint:disable-next-line:export-name
export default () => next => action =>
  action ? typeof action.then === 'function'
    ? Promise.resolve(action).then(next, warn)
    : next(action) : {};
