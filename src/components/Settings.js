
import React from "react";
import {
    AppRegistry, View,
    DatePickerIOS, Text, AsyncStorage,
    Button, Alert, DatePickerAndroid, Platform,
    TouchableOpacity, StyleSheet
} from "react-native";
import { textStyles } from "../styles/textStyles";
import { BIRTHDAY_STORE_KEY } from "../common/constants";

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
            {!this.birthDate && <Text style={[textStyles.text, textStyles.shadow]}>Please, pick your birthdate</Text>}
            {this.birthDate && <Text style={[textStyles.text, textStyles.shadow]}>Your birthdate is:</Text>}


            {Platform.OS === "ios" && <DatePickerIOS
                date={this.birthDate}
                onDateChange={this.iOsSetDate}
                mode="date"
            />}
            {Platform.OS === "ios" && <Button onPress={this.iOsSaveDate} title="Save my birthday!" />}


            {Platform.OS === "android" && this.birthDate && <Text style={textStyles.text}>
                {this.birthDate.toLocaleDateString()}</Text>}
            {Platform.OS === "android" && !this.birthDate && <TouchableOpacity
                onPress={this.openAndroidDataPicker}
                style={styles.buttonContainer}
            >
                <Text style={styles.buttonText}>Set my birthday!</Text>
            </TouchableOpacity>}
            {Platform.OS === "android" && this.birthDate && <Button
                onPress={this.openAndroidDataPicker}
                title="Change my birthday!"
            />}
        </View>);
    }

    iOsSetDate(newDate) {
        this.setState({ chosenDate: newDate });
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
                    AsyncStorage.setItem("birthDate", this.state.chosenDate.getTime().toString());
                    if (this.props.dateUpdated) {
                        this.props.dateUpdated(this.state.chosenDate);
                    }
                }
            });
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        flexGrow: 1,
        justifyContent: "space-between",

    },
    buttonContainer: {
        backgroundColor: "#0984e3",
        padding: 10,
        opacity: 0.9,
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 20,
    },
});

AppRegistry.registerComponent("Settings", () => Settings);
