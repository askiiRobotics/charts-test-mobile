/**
 * reducer for user's financial info, for example, total savings
 */
'use strict';

import { cloneDeep } from 'lodash';
import { CURRENT_STATE_VERSION, RequestStatus } from '../common';

const defaultState = Object.freeze({
    totalSavings: [],
    sevingsRequestProcessing: false,
    sevingsRequestError: '',
    fromDate: '',
    toDate: '',
    version: CURRENT_STATE_VERSION
});

function updateTotalSavingsInfo(
    state, 
    action
) {
    let newState = cloneDeep(state);
    const { data, status, message } = action;
  
    switch (status) {
      case RequestStatus.success:
        newState.sevingsRequestError = '';
        newState.sevingsRequestProcessing = false;
        newState.totalSavings = data.totalSavings;
        break;

      case RequestStatus.fetching:  
        newState.sevingsRequestProcessing = true;
        break;

      case RequestStatus.error:
        newState.sevingsRequestError = message;
        newState.sevingsRequestProcessing = false;
        break;

      default:
        break;
    }
    return newState;
  }

export default function userFinancialInfo(
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
    GET_USER_TOTAL_SAVINGS:   Symbol('GET_USER_TOTAL_SAVINGS'),
});