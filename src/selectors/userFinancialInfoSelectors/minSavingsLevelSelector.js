/**
 * single calculated selector for getting min amount of savings per month
 */
'use strict';

import { createSelector } from 'reselect';
import { totalSavingsSelector } from '.';

// eslint-disable-next-line import/prefer-default-export
export const minSavingsLevelSelector = createSelector(
  [totalSavingsSelector],
  (totalSavings) => {
    return totalSavings ?
      totalSavings.reduce((accumulator, obj) => accumulator < obj.amount ? accumulator : obj.amount, 0) : 0;
  },
);