import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import BirthdayTimer from '../common/BirthdayTimer';
import { textStyles } from "../styles/textStyles";
import { DangerZone } from 'expo';
import { localization } from './counter.localization';
import resolveLocale from '../common/Localization';
const { Localization } = DangerZone;

export default class Counter extends Component {

    constructor(props) {
        super(props);
        this.updateRemainingTime = this.updateRemainingTime.bind(this);
        this.state = {
            timer: new BirthdayTimer(),
        };
        this.localeStore = new Localization.LocaleStore(localization);

        setInterval(this.updateRemainingTime, 1000);
    }

    async componentDidMount() {
        const currentLocale = await Localization.getCurrentLocaleAsync();
        const newLocale = resolveLocale(currentLocale);
        if (newLocale !== currentLocale) {
            this.localeStore.setLocale(newLocale);
        }

        this.state.timer.initialize(this.props.birthDate);
    }

    componentDidUpdate() {
        this.state.timer.initialize(this.props.birthDate);
    }

    updateRemainingTime() {
        this.setState(prevState => {
            prevState.timer.countdownDate.tick();
            return {
                timer: prevState.timer,
            };
        });
    }

    render() {
        const isInitialized = this.state.timer.countdownDate.isInitialized;
        return (<View style={styles.container}>
            <Text
                allowFontScaling={false}
                style={[textStyles.text, textStyles.shadow, textStyles.screenHeader]}
            >
                {this.localeStore.yourBirthdayWillBeIn}
            </Text>
            <Text>{this.state.currentLocale}</Text>
            <View style={styles.circleContainer}>
                <View style={styles.circle}>
                    {!isInitialized && <Text
                        allowFontScaling={false}
                        style={styles.smallCircleText}>{this.localeStore.pleaseSwipeRightToSelectBirthDate}
                    </Text>}
                    {isInitialized && <Text
                        allowFontScaling={false}
                        style={styles.circleText}>{this.state.timer.countdownDate.days} {this.localeStore.days}
                    </Text>}
                    {isInitialized && <Text
                        allowFontScaling={false}
                        style={styles.circleText}>
                        {this.state.timer.countdownDate.hours} {this.localeStore.hours}
                    </Text>}
                    {isInitialized && <Text
                        allowFontScaling={false}
                        style={styles.circleText}>
                        {this.state.timer.countdownDate.minutes} {this.localeStore.minutes}
                    </Text>}
                    {isInitialized && <Text
                        allowFontScaling={false}
                        style={styles.circleText}>
                        {this.state.timer.countdownDate.seconds} {this.localeStore.seconds}
                    </Text>}
                </View>
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    circleContainer: {
        flex: 1,
        justifyContent: "center",
    },
    circle: {
        backgroundColor: 'skyblue',
        borderRadius: (Dimensions.get("window").width - 50) / 2,
        width: Dimensions.get("window").width - 50,
        height: Dimensions.get("window").width - 50,
        alignItems: "center",
        justifyContent: "center",
    },
    circleText: {
        color: "white",
        fontSize: 40,
        textAlign: "center",
    },
    smallCircleText: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
    },
});

AppRegistry.registerComponent('Counter', () => Counter);