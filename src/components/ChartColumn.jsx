/**
 * a component for rendering a single charts column
 */
'use strict';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearColorInterpolator, Color } from '../common';

const styles = StyleSheet.create({
    columm: {
        flexDirection: 'column',
        flex: 1,
        marginHorizontal: 5,
    },
    emptyPart: {
    },
    filledPard: {
    },
});

const leftColumnColor = new Color('#2DE6D6'); // left column color from example
const rightColumnColor = new Color('#0094EA'); // right column color from example

interface IProps {
    index: number; 
    length: number;
    max: number;
    amount: number;
}

const ChartColumn = (props: IProps) => {
  const { index, length, max, amount } = props;
  const positionColor = LinearColorInterpolator.findColorBetween(
        leftColumnColor, 
        rightColumnColor, 
        (100 / (length - 1)) * index,
      );
  const columnValue = Math.floor((amount / max) * 100);
  const emptyValue = 100 - columnValue;

  return (
    <View style={[styles.columm]}>
      <View style={[styles.emptyPart, { flex: emptyValue }]} />
      <View style={[styles.filledPard, { flex: columnValue, backgroundColor: positionColor.asRgbCss() }]} />
    </View>
  );
};

export default ChartColumn;