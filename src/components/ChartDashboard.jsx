/**
 * a component for render a screen with a charts dashboard
 */
'use strict';

import React from 'react';
import { 
  StyleSheet,
  View, 
  Dimensions,
} from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { reverse } from 'lodash';
import { ChartColumn, ChartGrid } from '.';
import { dashboardSelector } from '../selectors';
import { getOrientation } from '../common';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    columnContainer: {
      ...StyleSheet.absoluteFillObject,
      top: 112,
      right: 30,
      left: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
});
  
interface IProps {
    savings: object;
    max: number;
    min: number;
    start: string; // YYYY-MM-DD
    end: string; // YYYY-MM-DD
}

interface IState {
  screen: string,
}

class ChartDashboard extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      screen: Dimensions.get('window'),
    };

    
    Dimensions.addEventListener('change', () => {
      this.setState({
        screen: Dimensions.get('window'),
      });
    });
  }

  getMax(max) {
    if(max <= 0 || !max) {
      return 10;
    }
    const length = Math.log(max) * Math.LOG10E + 1 | 0; // we can have here float numbers
    const numDigit = Math.pow(10, length - 1);
    const firstDigit = parseInt(max.toString().substring(0, 1));
    return (firstDigit + 1) *  numDigit;
  }

  render() {
      const {
          min,
          max,
          start,
          end,
          savings,
      } = this.props;
      const columnLength = savings ? savings.length : 0;

      const maxValue = this.getMax(max); // for example top level can be equal to max value,
      // but progressive chart can create a motivation for better results
      
      const { screen } = this.state;

      const baseLevel = getOrientation(screen) === 'LANDSCAPE' ? {
        bottom: 68,
      } : {
        bottom: 115,
      };

      return (
        <View style={styles.container}>
          <Header
            containerStyle={{
              backgroundColor: 'transparent',
            }}
            centerComponent={{ 
              text: 'TOTAL SAVINGS', 
              style: { 
                color: 'blue',
              },
            }}
          />
          <ChartGrid max={maxValue} min={min} start={start} end={end} numberOfLevels={5} />
          <View style={[styles.columnContainer, baseLevel]}>
            {
              savings ? 
                reverse(savings).map(columnGenerator(columnLength, maxValue)) 
                : <View />
                // to avoid memory leeks we need to move every lambda function from render to an outside
            }
          </View>
        </View>
      );
  }
}

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