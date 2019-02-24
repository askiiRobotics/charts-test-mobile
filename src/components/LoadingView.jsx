/**
 * a component for loading splash screen
 */
'use strict';

import React from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

// TODO: add logo and media backgroung for better impression

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
    },
});

const LoadingView = () => {
    return (
      <View style={styles.page}>
        {
    /** TODO: add
     *         <ActivityIndicator
     *          color='blue'
     *          size='red'
     *        />
     */
    }
      </View>
    );
};

export default LoadingView;