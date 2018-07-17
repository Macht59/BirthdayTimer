import React from 'react';
import { StyleSheet, View } from 'react-native';
import Summary from './src/components/Summary';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Summary />
        {/* <AdBar /> */}
      </View>
    );
  }
}

export function sum(a, b) {
  return a + b;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f3ff',
  },
});
