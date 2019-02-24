/**
 * Root component for the Charts Application
 *
 * @format
 * @flow
 */
/* global __DEV__ */
'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { YellowBox, View } from 'react-native';
import { persistor, store } from './store';
import { RootComponent, LoadingView } from './components';

if (__DEV__) {
  YellowBox.ignoreWarnings(['']);
  console.disableYellowBox = true;
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
};

export default App;