/**
 * dashboardSelector is a selector for a charts dashboard component
 */
'use strict';

import { createSelector } from 'reselect';
import {
    totalSavingsSelector,
    maxSavingsLevelSelector,
    minSavingsLevelSelector,
    startDateSelector,
    endDateSelector,
 } from '..';

const dashboardSelector = createSelector(
  [
    totalSavingsSelector,
    maxSavingsLevelSelector,
    minSavingsLevelSelector,
    startDateSelector,
    endDateSelector,
  ],
  (
    savings: object,
    max: number,
    min: number,
    start: string,
    end: string,
    ) => {
    return {
        savings,
        max,
        min,
        start,
        end,
    };
  },
);

export default dashboardSelector;
