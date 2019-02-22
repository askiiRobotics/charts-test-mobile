/**
 * helper functions and tools
 */
'use strict';

import { isFunction } from 'lodash';
import { RequestStatus } from '.';

// helper function to dispatch 3 types of action: fetching, error, success of API call
// eslint-disable-next-line import/prefer-default-export
export async function performApiCall(dispatch, actionType, apiCall, successCallback) {
    let action: any = {
      type: actionType,
      status: RequestStatus.fetching,
    };
    dispatch(action);
    try {
      const response = await apiCall();
      action = {
        type: actionType,
        status: RequestStatus.success,
        lastUpdated: Date.now(),
        ...response,
      };
      if (isFunction(successCallback)) {
        successCallback();
      }
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.warn(ex);
      const error: AxiosError = ex;
  
      action = {
        type: actionType,
        status: RequestStatus.error,
        statusCode: error.response ? error.response.status : 'unknown',
        message: error.response && error.config ?
        `Network error for ${error.config.method ? error.config.method.toUpperCase() : 'unknown method'} ${
          error.config.baseURL}${error.config.url}: ${error.response ? error.response.status : 404}` : `${ex}`,
        lastUpdated: Date.now(),
      };
    }
  
    return dispatch(action);
  }