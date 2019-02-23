/**
 * appReducers is all application combined reducers
 */
'use strict';

import { combineReducers } from 'redux';
import { userFinancialInfo } from '.';

const reducers = combineReducers({
  userFinancialInfo,
});

export default reducers;