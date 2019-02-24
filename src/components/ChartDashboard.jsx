/**
 * a component for render a screen with a charts dashboard
 */
'use strict';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { ChartColumn } from '.';
import { dashboardSelector } from '../selectors';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});
  
interface IProps {
    savings: object;
    max: number;
    min: number;
    start: string; // YYYY-MM-DD
    end: string; // YYYY-MM-DD
}
  
const ChartDashboard = (props: IProps) => {
      const {
          min,
          max,
          start,
          end,
          savings,
      } = props;
      const columnLength = savings.edges.length;

      return (
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'TOTAL SAVINGS', style: { color: 'blue' } }}
          />
          <ChartGrid max={max} min={min} start={start} end={end} numberOfLevels={5} />
          <View style={styles.gridContainer}>
            {
              savings.edges.map(columnGenerator(columnLength, max)) 
                // to avoid memory leeks we need to move every lambda function from render to an outside
            }
          </View>
        </View>
      );
};

const columnGenerator = (length, max) => (saving, i) => (
  <ChartColumn 
    key={saving.node} 
    {...saving} 
    index={i} 
    length={length}
    max={max}
  />
);

export default (connect(dashboardSelector)(ChartDashboard));