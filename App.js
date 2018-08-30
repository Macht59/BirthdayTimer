import React from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';
import Summary from './src/components/summary';
import { AppLoading } from 'expo';
import { BIRTHDAY_STORE_KEY } from "./src/common/constants";

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      birthDate: null,
    };

    this.cacheResourcesAsync = this.cacheResourcesAsync.bind(this);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }


    return (
      <View style={styles.container}>
        <Summary birthDate={this.state.birthDate} />
      </View>
    );
  }

  cacheResourcesAsync() {
    return AsyncStorage.getItem(BIRTHDAY_STORE_KEY, (error, result) => {
      let birthDate = null;
      if (!error) {
        const resultNumber = Number(result);
        if (resultNumber) {
          birthDate = new Date(resultNumber);
        }
      }

      this.setState({ birthDate });
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f3ff',
  },
});
