import React from 'react';
import { StyleSheet, View } from 'react-native';
import Summary from './src/components/Summary';
import AdBar from "./src/components/AdBar";

export default class App extends React.Component {
    render() {
    return (
      <View style={styles.container}>
        <Summary />
        <AdBar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f3ff',
  },
});
