import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    Dimensions,
    Switch,
} from 'react-native';
import BirthdayTimer from '../common/BirthdayTimer';
import { textStyles } from "../styles/textStyles";
import { DangerZone, KeepAwake } from 'expo';
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

    onSwitchChange = (value) => {
        if (value){
            KeepAwake.activate();
        } else {
            KeepAwake.deactivate();
        }
        
        this.setState({
            doNotDim: value,
        });
    }

    updateRemainingTime() {
        this.setState(prevState => {
            prevState.timer.countdownDate.tick();
            return {
                timer: prevState.timer,
            };
        });
    }

    getYearsEnding() {
        const lastDigit = this.state.timer.nextAge % 10;
        switch (lastDigit) {
            case 1:
                return this.localeStore.yearOld;
            case 2:
            case 3:
            case 4:
                return this.localeStore.yearsOld1;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 0:
                return this.localeStore.yearsOld2;
        }
    }

    render() {
        const isInitialized = this.state.timer.countdownDate.isInitialized;
        return (<View style={styles.container}>
            <Text
                allowFontScaling={false}
                style={[textStyles.text, textStyles.shadow, textStyles.screenHeader]}
            >
                {this.localeStore.yourBirthdayWillBe} <Text>{this.state.timer.nextAge}</Text> {this.getYearsEnding()}
            </Text>
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
            <View style={styles.switchContainer}>
                <Switch
                    onValueChange={this.onSwitchChange}
                    value={this.state.doNotDim}
                />
                <Text style={styles.switchText}>{this.localeStore.doNotDim}</Text>
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
    switchText: {
        color: "skyblue",
        fontSize: 15,
        paddingLeft: 15,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        paddingBottom: 15,
    },
});

AppRegistry.registerComponent('Counter', () => Counter);