/**
 * a component for rendering a grid for a charts dashboard
 */
'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { Divider } from 'react-native-elements';

// TODO: to make moment localizable

const moment = extendMoment(Moment);

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      top: 100,
      right: 30,
    },
    xAxiosContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
    },
    levelContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    labelXContainer: {
      justifyContent: 'flex-end',
      flexDirection: 'row',
      marginRight: 15,
      flex: 1,
    },
    levelLineContainer: {
      flex: 5,
    },
    levelLine: {
      backgroundColor: 'gray',
      marginTop: 12,
    },
    xLabelContainer: {
      flex: 1,
    },
    emptyXLabel: {
      marginRight: 15,
    },
    label: {

    }
});

interface IProps {
    min: number,
    max: number,
    start: string, // YYYY-MM-DD
    end: string, // YYYY-MM-DD
    numberOfLevels: number,
}

interface IGridYLevelProps {
    index: number;
    label: string;
}

const GridYLevel = (props: IGridYLevelProps) => {
    const { label } = props;

    return (
      <View style={styles.levelContainer}>
        <View style={styles.labelXContainer}>
          <Text style={styles.label}>
            {label}
          </Text>
        </View>
        <View style={styles.levelLineContainer}>
          <Divider style={styles.levelLine} />
        </View>
      </View>
    );
};

interface IState {
  screen: string;
}

class ChartGrid extends React.Component<IProps, IState> {
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
    
    getOrientation(){
      const { screen } = this.state;

      if (screen.width > screen.height) {
        return 'LANDSCAPE';
      }else {
        return 'PORTRAIT';
      }
    }

    getMaxYLabel(max) {
        if(max <= 0 || !max) {
          return 10;
        }
        const length = Math.log(max) * Math.LOG10E + 1 | 0; // we can have here float numbers
        const numDigit = Math.pow(10, length - 1);
        const firstDigit = parseInt(max.toString().substring(0, 1));
        return (firstDigit + 1) *  numDigit;
    }

    getYAxiosLabels() {
        const { max, numberOfLevels } = this.props;
        if(max < 0 || !max) {
            return [0];
        }
        const maxLabel = this.getMaxYLabel(max);
        const step = Math.floor(maxLabel / ( numberOfLevels - 1));

        return Array.apply(null, Array(numberOfLevels)).map((_val, i) => i * step);
    }

    getXAxiosLabels() {
        const { start, end } = this.props;
        if(!start || !end) {
          return [];
        }
        const range = moment.range(start, end);

        return Array.from(range.by('months')).map(m => m.format('MMM'));
    }

    gridYLevelHandler = (yLabels, yLabelsRightPosition) => 
                            (_val, i) => this._renderGridYLevel(yLabels, yLabelsRightPosition, i)

    _renderGridYLevel(yLabels, yLabelsRightPosition, i) {
        return (
          <GridYLevel
            key={`grid_y_${i}`}
            index={i}
            label={yLabels[yLabelsRightPosition - i]}
          />
        );
    }

    _renderGridXStep(label, i) {
        return (
          <View style={styles.xLabelContainer}>
            <Text key={`${label}${i}`} style={styles.label}>
              {label}
            </Text>
          </View>
        );
    }

    render() {
        const xLabels = this.getXAxiosLabels();
        const yLabels = this.getYAxiosLabels();
        const yLabelsRightPosition = yLabels.length - 1;

        const xAxiosPositioningStyle = this.getOrientation() === 'LANDSCAPE' ? {} : {
          marginTop: -70,
        };

        return (
          <View style={styles.container}>
            {
                yLabels.map(this.gridYLevelHandler(yLabels, yLabelsRightPosition))
            }
            <View style={[
              styles.levelContainer, 
              styles.xAxiosContainer,
              xAxiosPositioningStyle,
              ]}
            >
              <View style={[
                styles.xLabelContainer, 
                styles.emptyXLabel,
                ]}
              />
              {
                  xLabels.map(this._renderGridXStep)
              }
            </View>
          </View>
        );
    }
}

export default ChartGrid;