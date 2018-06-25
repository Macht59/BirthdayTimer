import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';

export default class Counter extends Component {

    constructor(props) {
        super(props);
        this.updateRemainingTime = this.updateRemainingTime.bind(this);
        this.initializeRemainingTime = this.initializeRemainingTime.bind(this);
        this.state = {
            countdownDate: null,
            birthDate: null,
        };

        setInterval(this.updateRemainingTime, 1000);
    }

    componentDidMount() {
        console.log("Counter -> componentDidMount");
        if (this.props.birthDate) {
            this.initializeRemainingTime();
        }
    }

    componentDidUpdate() {
        console.log("Counter -> componentDidUpdate");
        if (this.props.birthDate !== this.state.birthDate) {
            this.initializeRemainingTime();
        }
    }

    updateRemainingTime() {
        if (!this.state.countdownDate) {
            return;
        }

        this.setState(prevState => {
            return {
                countdownDate: new Date(prevState.countdownDate.getTime() - 1000),
            };
        });
    }

    initializeRemainingTime() {
        if (!this.props.birthDate) {
            if (this.state.birthDate || this.state.countdownDate) {
                this.setState(() => {
                    return {
                        countdownDate: null,
                        birthDate: null,
                    }
                })
            }

            return;
        }

        let diff = this.props.birthDate - new Date().setFullYear(this.props.birthDate.getFullYear());
        if (diff < 0) {
            diff += 365 * 24 * 60 * 60 * 1000;
        }

        // const seconds = Math.ceil((diff / 1000) % 60) - 1;
        // const minutes = Math.ceil((diff / (60 * 1000)) % 60) - 1;
        // const hours = Math.ceil((diff / (60 * 60 * 1000)) % 24) - 1;
        // const days = Math.ceil((diff / (24 * 60 * 60 * 1000))) - 1;

        this.setState(() => {
            return {
                countdownDate: new Date(diff),
                birthDate: this.props.birthDate,
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
                {!this.state.countdownDate && <Text style={styles.circleText}>Swipe right to select date</Text>}
                {this.state.countdownDate && <Text style={styles.circleText}>{this.state.countdownDate.getMonth()} Month</Text>}
                {this.state.countdownDate && <Text style={styles.circleText}>{this.state.countdownDate.getDate()} Days</Text>}
                {this.state.countdownDate && <Text style={styles.circleText}>{this.state.countdownDate.getHours()} Hours</Text>}
                {this.state.countdownDate && <Text style={styles.circleText}>{this.state.countdownDate.getMinutes()} Minutes</Text>}
                {this.state.countdownDate && <Text style={styles.circleText}>{this.state.countdownDate.getSeconds()} Seconds</Text>}
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