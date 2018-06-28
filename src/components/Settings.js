
import React from "react";
import { AppRegistry, View, DatePickerIOS, Text, AsyncStorage, Button, Alert, DatePickerAndroid, Platform } from "react-native";
import { textStyles } from "../styles/textStyles";

export default class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.setDate = this.setDate.bind(this);
        this.saveDate = this.saveDate.bind(this);
        this.openAndroidDataPicker = this.openAndroidDataPicker.bind(this);

        this.state = { chosenDate: null };
    }

    get birthDate(){
        return this.state.chosenDate ? this.state.chosenDate : this.props.birthDate;
    }

    render() {
        return (<View style={{paddingTop: 30}}>
            {!this.birthDate && <Text style={[textStyles.text, textStyles.shadow]}>Please, pick your birthdate</Text>}
            {this.birthDate && <Text style={[textStyles.text, textStyles.shadow]}>Your birthdate is:</Text>}
            
            {Platform.OS === "ios" && <DatePickerIOS
                date={this.birthDate}
                onDateChange={this.setDate}
                mode="datetime"
            />}
            {Platform.OS === "ios" && <Button onPress={this.saveDate} title="Save my birthday!" />}

            {Platform.OS === "android" && this.birthDate && <Text style={textStyles.text}>
                {this.birthDate.toLocaleDateString()}</Text>}
            {Platform.OS === "android" && !this.birthDate && <Button
                onPress={this.openAndroidDataPicker}
                title="Set my birthday!"
            />}
            {Platform.OS === "android" && this.birthDate && <Button
                onPress={this.openAndroidDataPicker}
                title="Change my birthday!"
            />}
        </View>);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    saveDate() {
        AsyncStorage.setItem("birthDate", this.birthDate.getTime().toString());
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

AppRegistry.registerComponent("Settings", () => Settings);
