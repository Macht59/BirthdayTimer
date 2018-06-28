import React from "react";
import { AppRegistry, Text, View, AsyncStorage } from "react-native";
import Counter from "./Counter";
import Swiper from "react-native-swiper";
import Settings from "./Settings";
import { textStyles } from "../styles/textStyles";

export default class Summary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { birthDate: null };

        this.initializeBirthDate = this.initializeBirthDate.bind(this);
        this.updateBirthdate = this.updateBirthdate.bind(this);
        this.clearBirthdate = this.clearBirthdate.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getItem("birthDate", this.initializeBirthDate);
    }

    render() {
        return (
            <Swiper
                activeDotColor="skyblue"
                loop={false}
                index={this.state.swiperIndex}
                style={{ flex: 1, justifyContent: "space-around" }}
            >
                <View style={{ flex: 1, marginBottom: 20, alignContent: "center", justifyContent: "space-around" }}>
                    <Text style={[textStyles.text, textStyles.shadow]}>Your birthday will be in:</Text>
                    <Counter birthDate={this.state.birthDate} />
                </View>
                <View>
                    <Settings dateUpdated={this.updateBirthdate} birthDate={this.state.birthDate} />
                </View>
            </Swiper>
        );
    }

    initializeBirthDate(error, result) {
        console.log(JSON.stringify(result));
        if (!error && result) {
            this.setState({ birthDate: new Date(Number(result)) });
        }
        if (!result) {
            this.setState({ sliderIndex: 1 });
        }
    }

    updateBirthdate(newDate) {
        this.setState({ birthDate: newDate });
    }

    clearBirthdate() {
        this.setState({ birthDate: null });
    }
}

AppRegistry.registerComponent("Summary", () => Summary);