/**
 * Redux store configuration
 *
 * @format
 * @flow
 */
/* global __DEV__ */
'use strict';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {
    applyMiddleware,
    createStore,
  } from 'redux';
import { array, promise } from '.';
import rootReducer from '../reducers';

const isDebuggingInChrome = __DEV__ && !!(window && window.navigator && window.navigator.userAgent);

const logger = createLogger({
    predicate: () => isDebuggingInChrome,
    collapsed: true,
    duration: true,
    level: 'log',
});

const createApplicationStore = applyMiddleware(
    thunk,
    promise,
    array,
    logger,
)(createStore);

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createApplicationStore(pReducer);
export const persistor = persistStore(store);