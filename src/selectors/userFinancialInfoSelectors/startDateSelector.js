/**
 * single selector for store.userFinancialInfo.startDate
 */
'use strict';

import { createSelector } from 'reselect';

const startDateSelectorInner = (store) => store.userFinancialInfo.startDate;

// eslint-disable-next-line import/prefer-default-export
export const startDateSelector = createSelector(
  [startDateSelectorInner],
  (startDate) => {
    return startDate;
  },
);