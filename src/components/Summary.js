import React from "react";
import { AppRegistry, Text, View, AsyncStorage, StyleSheet } from "react-native";
import Counter from "./Counter";
import Swiper from "react-native-swiper";
import Settings from "./Settings";
import { textStyles } from "../styles/textStyles";
import { BIRTHDAY_STORE_KEY } from "../common/constants";

export default class Summary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { birthDate: null };

        this.initializeBirthDate = this.initializeBirthDate.bind(this);
        this.updateBirthdate = this.updateBirthdate.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getItem(BIRTHDAY_STORE_KEY, this.initializeBirthDate);
    }

    render() {
        return (
            <Swiper
                activeDotColor="skyblue"
                loop={false}
                index={this.state.swiperIndex}
                style={{ justifyContent: "space-around" }}
            >
                <View style={styles.slideContainer}>
                    <Text style={[textStyles.text, textStyles.shadow]}>Your birthday will be in:</Text>
                    <Counter birthDate={this.state.birthDate} />
                </View>
                <View style={styles.slideContainer}>
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
}

const styles = StyleSheet.create({
    slideContainer: {
        flex: 1,
        marginBottom: 20,
        alignContent: "center",
        justifyContent: "space-around",
    },
});

AppRegistry.registerComponent("Summary", () => Summary);