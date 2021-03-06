/**
 * reducer for user's financial info, for example, total savings
 */
'use strict';

import { cloneDeep } from 'lodash';
import { CURRENT_STATE_VERSION, RequestStatus } from '../common';

const defaultState = Object.freeze({
    totalSavings: [],
    savingsRequestProcessing: true, // at the first open we need to load a data
    savingsRequestError: '',
    startDate: '2018-08-01',
    endDate: '2018-12-01',
    version: CURRENT_STATE_VERSION
});

function updateTotalSavingsInfo(
    state, 
    action
) {
    let newState = cloneDeep(state);
    const { data, status, message } = action;
  
    switch (status) {
      case RequestStatus.SUCCESS:
        newState.savingsRequestError = '';
        newState.savingsRequestProcessing = false;
        newState.totalSavings = data;
        break;

      case RequestStatus.FETCHING:  
        newState.savingsRequestProcessing = true;
        break;

      case RequestStatus.ERROR:
        newState.savingsRequestError = message;
        newState.savingsRequestProcessing = false;
        break;

      default:
        break;
    }
    return newState;
  }

export function userFinancialInfo(
    state = defaultState,
    action,
  ) {
    const currentState = CURRENT_STATE_VERSION === state.version ? state : cloneDeep(defaultState);

    switch (action.type) {
        case FINANCIAL_INFO.GET_USER_TOTAL_SAVINGS:
            return updateTotalSavingsInfo(currentState, action);
        default:
            return currentState;
  }
}

export const FINANCIAL_INFO = Object.freeze({
    GET_USER_TOTAL_SAVINGS:   'GET_USER_TOTAL_SAVINGS',
});