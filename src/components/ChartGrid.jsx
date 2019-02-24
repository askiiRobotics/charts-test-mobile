/**
 * a component for rendering a grid for a charts dashboard
 */
'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

// TODO: to make moment localizable

const moment = extendMoment(Moment);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      ...StyleSheet.absoluteFillObject,
    },
    xAxiosContainer: {

    },
    levelContainer: {

    },
    labelXContainer: {

    },
    levelLine: {

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
        <View style={styles.levelLine} />
      </View>
    );
};

class ChartGrid extends React.Component<IProps, IState> {
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

        return new Array(numberOfLevels).map((_val, i) => i * step);
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
          <Text key={`${label}${i}`} style={styles.label}>
            {label}
          </Text>
        );
    }

    render() {
        const { numberOfLevels } = this.props;
        const xLabels = this.getXAxiosLabels();
        const yLabels = this.getYAxiosLabels();
        const yLabelsRightPosition = yLabels.length - 1;

        return (
          <View style={styles.container}>
            {
                new Array(numberOfLevels).map(this.gridYLevelHandler(yLabels, yLabelsRightPosition))
            }
            <View style={[styles.levelContainer, styles.xAxiosContainer]}>
              {
                  xLabels.map(this._renderGridXStep)
              }
            </View>
          </View>
        );
    }
}

export default ChartGrid;