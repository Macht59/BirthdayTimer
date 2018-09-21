import React from "react";
import { View, AppRegistry } from "react-native";

export default class AdBar extends React.Component {
  
  render() {
    return (
      <View>
        {/* <AdMobBanner
          adSize="banner"
          adUnitID="ca-app-pub-7409231048157456/4292105638"
          ref={el => (this._basicExample = el)}
          style={{ alignSelf: "center" }}
          onAdFailedToLoad={this.onAdFailedToLoad}
        /> */}
      </View>
    );
  }

  onAdFailedToLoad() {
    console.log("AdMob bar failed to load.");
  }
  
}

AppRegistry.registerComponent("AdBar", () => AdBar);
