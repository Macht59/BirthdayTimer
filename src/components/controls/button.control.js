
import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, AppRegistry } from 'react-native';

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#0984e3",
    padding: 10,
    opacity: 0.9,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
});

AppRegistry.registerComponent("Button", () => Button);