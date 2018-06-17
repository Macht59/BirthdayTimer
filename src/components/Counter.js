import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, View, TextInput, Dimensions, AsyncStorage, ActivityIndicator } from 'react-native';

export default class Counter extends Component {

    constructor(props) {
        super(props);
        this.updateRemainingTime = this.updateRemainingTime.bind(this);
        this.state = {
            month: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        console.debug(JSON.stringify(this.props));

        setInterval(this.updateRemainingTime, 1000);
    }

    updateRemainingTime() {
        let diff = this.props.birthDate - new Date();
        if (diff < 0) {
            diff += 365 * 24 * 60 * 60 * 1000;
        }

        const seconds = Math.ceil((diff / 1000) % 60) - 1;
        const minutes = Math.ceil((diff / (60 * 1000)) % 60) - 1;
        const hours = Math.ceil((diff / (60 * 60 * 1000)) % 24) - 1;
        const days = Math.ceil((diff / (24 * 60 * 60 * 1000))) - 1;

        this.setState(previousState => {
            return {
                days,
                hours,
                minutes,
                seconds,
            };
        });
    }

    render() {
        return (<View style={styles.circle}>
            <View style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
            }}>
                <Text style={styles.circleText}>{this.state.days} Days</Text>
                <Text style={styles.circleText}>{this.state.hours} Hours</Text>
                <Text style={styles.circleText}>{this.state.minutes} Minutes</Text>
                <Text style={styles.circleText}>{this.state.seconds} Seconds</Text>
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    circle: {
        backgroundColor: 'skyblue',
        borderRadius: (Dimensions.get("window").width - 30) / 2,
        width: Dimensions.get("window").width - 30,
        height: Dimensions.get("window").width - 30,
        alignSelf: "center",
    },
    circleText: {
        color: "white",
        fontSize: 40,
    }
});

AppRegistry.registerComponent('Counter', () => Counter);