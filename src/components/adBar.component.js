import React from "react";
import { View, AppRegistry, Platform } from "react-native";
import {
  AdMobBanner,
} from 'expo';

export default class AdBar extends React.Component {

  render() {
    const iOsUnitId = "ca-app-pub-7409231048157456/8013801446";
    const androidUnitId = "ca-app-pub-7409231048157456/4292105638";

    return (
      <View>
        <AdMobBanner
          bannerSize="banner"
          adUnitID={Platform.OS === "ios" ? iOsUnitId : androidUnitId}
          onDidFailToReceiveAdWithError={this.bannerError}
          style={{ alignSelf: "center" }}
        />
      </View>
    );
  }

  bannerError(arg) {
    console.warn(`Banner failed to load. ${JSON.stringify(arg)}`);
  }

}

AppRegistry.registerComponent("AdBar", () => AdBar);
