/**
 * single selector for store.userFinancialInfo.sevingsRequestError
 */
'use strict';

import { createSelector } from 'reselect';

const sevingsRequestErrorSelectorInner = (store) => store.userFinancialInfo.sevingsRequestError;

// eslint-disable-next-line import/prefer-default-export
export const sevingsRequestErrorSelector = createSelector(
  [sevingsRequestErrorSelectorInner],
  (sevingsRequestError) => {
    return sevingsRequestError;
  },
);