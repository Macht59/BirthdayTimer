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
        if (this.props.birthDate) {
            this.initializeRemainingTime();
        }
    }

    componentDidUpdate() {
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
            this.setState(() => {
                return {
                    countdownDate: null,
                    birthDate: null,
                }
            })
            return;
        }

        let diff = this.props.birthDate - new Date().setFullYear(this.props.birthDate.getFullYear());
        if (diff < 0) {
            diff += 365 * 24 * 60 * 60 * 1000;
        }

        this.setState(() => {
            const dateWithTimeShift = new Date(diff);
            const pureDate = new Date(dateWithTimeShift.getTime() + dateWithTimeShift.getTimezoneOffset() * 60 * 1000);

            return {
                countdownDate: pureDate,
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
                {!this.state.countdownDate && <Text style={styles.smallCircleText}>Please, swipe right</Text>}
                {!this.state.countdownDate && <Text style={styles.smallCircleText}>to select your birthdate</Text>}
                {this.state.countdownDate && <Text style={styles.circleText}>{this.state.countdownDate.getMonth()} Month</Text>}
                {this.state.countdownDate && <Text style={styles.circleText}>{this.state.countdownDate.getDate() - 1} Days</Text>}
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
        alignSelf: "center",
    },
    smallCircleText: {
        color: "white",
        fontSize: 30,
        alignSelf: "center",
    }
});

AppRegistry.registerComponent('Counter', () => Counter);