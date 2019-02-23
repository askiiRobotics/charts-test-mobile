/**
 * a component for loading splash screen
 */
'use strict';

import React from 'react';
import {
    View,
    ActivityIndicator,
} from 'react-native';

// TODO: add logo and media backgroung for better impression

const styles = StyleSheet.create({
    page: {
      flex: 1,
    },
  });

const App = () => {
    return (
      <View style={styles.page}>
        <ActivityIndicator
          color='blue'
          size='red'
        />
      </View>
);
};

export default App;