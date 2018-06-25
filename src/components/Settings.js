
import React from "react";
import { AppRegistry, View, DatePickerIOS, Text, AsyncStorage, Button, Alert, DatePickerAndroid, Platform } from "react-native";
import { textStyles } from "../styles/textStyles";

export default class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.setDate = this.setDate.bind(this);
        this.saveDate = this.saveDate.bind(this);
        this.openDataPicker = this.openDataPicker.bind(this);

        this.state = { chosenDate: new Date() };
    }

    render() {
        return (<View>
            <Text style={[textStyles.header, textStyles.shadow, { paddingTop: 50 }]}>Please, pick your birthdate</Text>
            {Platform.OS === "ios" && <DatePickerIOS
                date={this.state.chosenDate}
                onDateChange={this.setDate}
                mode="datetime"
            />}
            {Platform.OS === "ios" && <Button
                onPress={this.saveDate}
                title="Save my birthday!"
            />}
            {Platform.OS === "android" && <Text
                style={[textStyles.header, {

                }]}
            >{this.state.chosenDate.toLocaleDateString()}</Text>}
            {Platform.OS === "android" && <Button
                onPress={this.openDataPicker}
                title="Set date"
            />}
        </View>);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    saveDate() {
        AsyncStorage.setItem("birthDate", this.state.chosenDate.getTime().toString());
        if (this.props.dateUpdated) {
            this.props.dateUpdated(this.state.chosenDate);
        }

        Alert.alert("Your birthdate has been saved!")
    }

    openDataPicker() {
        try {
            DatePickerAndroid.open({
                date: this.state.chosenDate
            }).then(value => {
                console.debug(value);
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

AppRegistry.registerComponent("Settings", () => Settings);
