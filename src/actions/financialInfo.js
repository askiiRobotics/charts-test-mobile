/**
 * actions for user's financial info operations
 */
'use strict';

import { performApiCall } from '../common';
import { startDateSelector, endDateSelector } from '../selectors';
import { userFinancialInfo } from '../businessServices';
import { FINANCIAL_INFO } from '../reducers';

// eslint-disable-next-line import/prefer-default-export
export function getUserTotalSavings() {
  return async (dispatch, getState) => {
    const store = getState();
    const from: string = startDateSelector(store);
    const to: string = endDateSelector(store);

    return performApiCall(
      dispatch,
      FINANCIAL_INFO.GET_USER_TOTAL_SAVINGS,
      userFinancialInfo.getUserTotalSavings(
        from,
        to,
                            )
            .then(data => ({ data })),
      null);
  };
}