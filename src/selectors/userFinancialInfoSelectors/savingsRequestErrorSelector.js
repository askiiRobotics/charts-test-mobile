/**
 * single selector for store.userFinancialInfo.savingsRequestError
 */
'use strict';

import { createSelector } from 'reselect';

const savingsRequestErrorSelectorInner = (store) => store.userFinancialInfo.savingsRequestError;

// eslint-disable-next-line import/prefer-default-export
export const savingsRequestErrorSelector = createSelector(
  [savingsRequestErrorSelectorInner],
  (savingsRequestError) => {
    return savingsRequestError;
  },
);