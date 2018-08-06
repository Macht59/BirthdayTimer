import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import BirthdayTimer from '../common/BirthdayTimer';

export default class Counter extends Component {

    constructor(props) {
        super(props);
        this.updateRemainingTime = this.updateRemainingTime.bind(this);
        this.state = {
            timer: new BirthdayTimer(),
        };

        setInterval(this.updateRemainingTime, 1000);
    }

    componentDidMount() {
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
        return (<View style={styles.circle}>
            <View style={styles.circleTextContainer}>
                {!this.state.timer.countdownDate.isInitialized && <Text style={styles.smallCircleText}>Please, swipe right</Text>}
                {!this.state.timer.countdownDate.isInitialized && <Text style={styles.smallCircleText}>to select your birthdate</Text>}
                {this.state.timer.countdownDate.isInitialized && <Text style={styles.circleText}>{this.state.timer.countdownDate.days} Days</Text>}
                {this.state.timer.countdownDate.isInitialized && <Text style={styles.circleText}>{this.state.timer.countdownDate.hours} Hours</Text>}
                {this.state.timer.countdownDate.isInitialized && <Text style={styles.circleText}>{this.state.timer.countdownDate.minutes} Minutes</Text>}
                {this.state.timer.countdownDate.isInitialized && <Text style={styles.circleText}>{this.state.timer.countdownDate.seconds} Seconds</Text>}
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
    circleTextContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    circleText: {
        color: "white",
        fontSize: 40,
        alignSelf: "center",
    },
    smallCircleText: {
        color: "white",
        fontSize: 30,
        alignSelf: "center",
    }
});

AppRegistry.registerComponent('Counter', () => Counter);