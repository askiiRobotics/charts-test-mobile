/**
 * Root component for high-level handlers, top-level components and navigation
 */
'use strict';

// TODO: add react-native-privacy-snapshot or analogs snapshot (the application contains sensitive information)

import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { rootSelector } from '../selectors';
import { ChartDashboard, LoadingView } from '.';
import { getUserTotalSavings } from '../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface IProps {
  loading?: boolean;
  getUserTotalSavings(): void;
}

class RootComponent extends React.Component<IProps, IState> {
    constructor(props: IProps, context?: any) {
      super(props, context);

      this.loadData(props);
    }
  
    loadData(props: IProps) {
      props.getUserTotalSavings();
    }

    render() {
      const { loading } = this.props;

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
  }
}


const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    getUserTotalSavings,
  },
                            dispatch);
};

// tslint:disable-next-line:export-name
export default (connect(rootSelector, mapDispatchToProps)(RootComponent));
