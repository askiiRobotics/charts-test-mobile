/**
 * single selector for store.userFinancialInfo.sevingsRequestProcessing
 */
'use strict';

import { createSelector } from 'reselect';

const sevingsRequestProcessingSelectorInner = (store) => store.userFinancialInfo.sevingsRequestProcessing;

// eslint-disable-next-line import/prefer-default-export
export const sevingsRequestProcessingSelector = createSelector(
  [sevingsRequestProcessingSelectorInner],
  (sevingsRequestProcessing) => {
    return sevingsRequestProcessing;
  },
);