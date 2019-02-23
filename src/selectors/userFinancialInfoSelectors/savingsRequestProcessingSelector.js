/**
 * single selector for store.userFinancialInfo.savingsRequestProcessing
 */
'use strict';

import { createSelector } from 'reselect';

const savingsRequestProcessingSelectorInner = (store) => store.userFinancialInfo.savingsRequestProcessing;

// eslint-disable-next-line import/prefer-default-export
export const savingsRequestProcessingSelector = createSelector(
  [savingsRequestProcessingSelectorInner],
  (savingsRequestProcessing) => {
    return savingsRequestProcessing;
  },
);