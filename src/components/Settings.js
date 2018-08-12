
import React from "react";
import {
    AppRegistry, View,
    DatePickerIOS, Text, AsyncStorage,
    Alert, DatePickerAndroid, Platform,
    TouchableOpacity, StyleSheet
} from "react-native";
import { textStyles } from "../styles/textStyles";
import { BIRTHDAY_STORE_KEY } from "../common/constants";
import Button from "../components/controls/Button";

export default class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.iOsSetDate = this.iOsSetDate.bind(this);
        this.iOsSaveDate = this.iOsSaveDate.bind(this);
        this.openAndroidDataPicker = this.openAndroidDataPicker.bind(this);

        this.state = { chosenDate: null };
    }

    get birthDate() {
        return this.state.chosenDate
            ? this.state.chosenDate
            : this.props.birthDate ? this.props.birthDate : new Date();
    }

    render() {
        return (<View style={styles.container}>
            {!this.birthDate && <Text
                style={[textStyles.text, textStyles.shadow, textStyles.screenHeader]}>
                Please, set your birthdate
            </Text>}
            {this.birthDate && <Text
                style={[textStyles.text, textStyles.shadow, textStyles.screenHeader]}>
                Your birthdate is:
            </Text>}
            {Platform.OS === "android"
                ? this.renderAndroidSettings()
                : Platform.OS === "ios" ? this.renderIosSettings() : null}
        </View>);
    }

    renderIosSettings() {
        return (
            <View style={styles.settings}>
                <DatePickerIOS
                    date={this.birthDate}
                    onDateChange={this.iOsSetDate}
                    mode="date"
                />
                <Button onPress={this.iOsSaveDate} title="Save my birthday!" />
            </View>
        );
    }

    renderAndroidSettings() {
        return (
            <View style={styles.settings}>
                {this.birthDate &&
                    <Text style={textStyles.text} onPress={this.openAndroidDataPicker}>
                        {this.birthDate.toLocaleDateString()}
                    </Text>}
                {!this.birthDate &&
                    <Button onPress={this.openAndroidDataPicker} title="Set my birthday!" />}
            </View>
        );
    }

    iOsSetDate(chosenDate) {
        this.setState({ chosenDate });
    }

    iOsSaveDate() {
        AsyncStorage.setItem(BIRTHDAY_STORE_KEY, this.birthDate.getTime().toString());
        if (this.props.dateUpdated) {
            this.props.dateUpdated(this.birthDate);
        }

        Alert.alert("Your birthdate has been saved!")
    }

    openAndroidDataPicker() {
        try {
            DatePickerAndroid.open({
                date: this.birthDate ? this.birthDate : new Date()
            }).then(value => {
                if (value.action !== DatePickerAndroid.dismissedAction) {
                    const chosenDate = new Date(value.year, value.month, value.day);
                    this.setState({ chosenDate });
                    AsyncStorage.setItem(BIRTHDAY_STORE_KEY, this.state.chosenDate.getTime().toString());
                    if (this.props.dateUpdated) {
                        this.props.dateUpdated(this.state.chosenDate);
                    }
                }
            });
        } catch ({ code, message }) {
            console.error('Cannot open date picker', message);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    settings: {
        flex: 1,
        justifyContent: "space-around",
    },
});

AppRegistry.registerComponent("Settings", () => Settings);
