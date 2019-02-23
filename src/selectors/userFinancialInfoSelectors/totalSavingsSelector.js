/**
 * single selector for store.userFinancialInfo.totalSavings
 */
'use strict';

import { createSelector } from 'reselect';

const totalSavingsSelectorInner = (store) => store.userFinancialInfo.totalSavings;

// eslint-disable-next-line import/prefer-default-export
export const totalSavingsSelector = createSelector(
  [totalSavingsSelectorInner],
  (totalSavings) => {
    return totalSavings;
  },
);