import React from "react";
import { View, AppRegistry } from "react-native";
import {
  AdMobBanner,
} from 'expo';

export default class AdBar extends React.Component {

  render() {
    return (
      <View>
        <AdMobBanner
          bannerSize="banner"
          adUnitID="ca-app-pub-7409231048157456/4292105638"
          testDeviceID="EMULATOR"
          onDidFailToReceiveAdWithError={this.bannerError}
          style={{ alignSelf: "center" }}
        />
      </View>
    );
  }

  bannerError(arg) {
    console.warn("banner failed to load");
  }

}

AppRegistry.registerComponent("AdBar", () => AdBar);
