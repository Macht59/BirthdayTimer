import React from "react";
import { View, AppRegistry } from "react-native";
import {
  AdMobBanner,
  AdMobRewarded,
  AdMobInterstitial,
  PublisherBanner
} from "react-native-admob";

export default class AdBar extends React.Component {
  render() {
    return (
      <View>
        <AdMobBanner
          adSize="banner"
          adUnitID="ca-app-pub-7409231048157456/4292105638"
          ref={el => (this._basicExample = el)}
          style={{alignSelf: "center"}}
          onAdFailedToLoad={this.onAdFailedToLoad}
        />
      </View>
    );
  }
  onAdFailedToLoad(a){
    console.log("onAdFailedToLoad");
    console.log(JSON.stringify(a));
  }
}

AppRegistry.registerComponent("AdBar", () => AdBar);
