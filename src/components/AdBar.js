import React from "react"
import { View, AppRegistry } from "react-native";
import {
  AdMobBanner,
  AdMobRewarded,
  AdMobInterstitial,
  PublisherBanner,
} from 'react-native-admob';

export default class AdBar extends React.Component {

    render() {
        return (<AdMobBanner
              adSize="banner"
              adUnitID="ca-app-pub-3940256099942544/6300978111"
              ref={el => (this._basicExample = el)}
            />);
    }

}

AppRegistry.registerComponent("AdBar", () => AdBar);
