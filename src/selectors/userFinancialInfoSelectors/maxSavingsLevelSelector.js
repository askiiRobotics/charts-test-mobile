/**
 * single calculated selector for getting max amount of savings per month
 */
'use strict';

import { createSelector } from 'reselect';
import { totalSavingsSelector } from '.';

// eslint-disable-next-line import/prefer-default-export
export const maxSavingsLevelSelector = createSelector(
  [totalSavingsSelector],
  (totalSavings) => {
    return totalSavings ?
      totalSavings.reduce((accumulator, obj) => accumulator > obj.amount ? accumulator : obj.amount, 0) : 0;
  },
);