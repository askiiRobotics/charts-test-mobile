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
import { ChartDashboard, LoadingView } from '.';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface IProps {
  loading?: boolean;
}

const RootComponent = (props: IProps) => {
    const { loading } = props;

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle='light-content'
          networkActivityIndicatorVisible={loading}
        />
        {
          loading ? <LoadingView /> : <ChartDashboard />
        }
      </View>
    );
};

// tslint:disable-next-line:export-name
export default (connect(rootSelector)(RootComponent));
