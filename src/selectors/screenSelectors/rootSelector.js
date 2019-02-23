/**
 * rootSelector is a selector for a root component
 */
'use strict';

import { createSelector } from 'reselect';
import { savingsRequestProcessingSelector } from '..';

const rootSelector = createSelector(
  [
    savingsRequestProcessingSelector,
  ],
  (
    savingsRequestProcessing: boolean,
    ) => {
    return {
      loading: savingsRequestProcessing,
    };
  },
);

export default rootSelector;
