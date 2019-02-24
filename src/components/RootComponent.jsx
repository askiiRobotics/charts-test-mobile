/**
 * Root component for high-level handlers, top-level components and navigation
 */
'use strict';

// TODO: add react-native-privacy-snapshot or analogs snapshot (the application contains sensitive information)

import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { config } from '..';
import { rootSelector } from '../selectors';
import { ChartsDashboard, LoadingView } from '.';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface IProps {
  loading?: boolean;
}

const RootComponent = (props: IProps) => {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={`#${config.MAIN_COLOR_HASH}`}
          barStyle='light-content'
          networkActivityIndicatorVisible={props.loading}
        />
        {
          props.loading ? <LoadingView /> : <ChartsDashboard />
        }
      </View>
    );
};

// tslint:disable-next-line:export-name
export default (connect(rootSelector)(RootComponent));
