import React from "react"
import { View, AppRegistry } from "react-native";
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'

export default class AdBar extends React.Component {

    render() {
        return (<AdMobBanner
            adSize="fullBanner"
            adUnitID="your-admob-unit-id"
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}
        />);
    }

}

AppRegistry.registerComponent("AdBar", () => AdBar);
