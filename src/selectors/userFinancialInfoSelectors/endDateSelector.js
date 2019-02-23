/**
 * single selector for store.userFinancialInfo.endDate
 */
'use strict';

import { createSelector } from 'reselect';

const endDateSelectorInner = (store) => store.userFinancialInfo.endDate;

// eslint-disable-next-line import/prefer-default-export
export const endDateSelector = createSelector(
  [endDateSelectorInner],
  (endDate) => {
    return endDate;
  },
);