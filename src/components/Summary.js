import React from "react";
import { AppRegistry, Text, View, StyleSheet, AsyncStorage } from "react-native";
import Counter from "./Counter";
import Swiper from "react-native-swiper";
import Settings from "./Settings";

export default class Summary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { birthDate: null };

        this.initializeBirthDate = this.initializeBirthDate.bind(this);
        this.updateBirthdate = this.updateBirthdate.bind(this);
    }

    componentDidMount() {
        this.setState({ initialLoading: true });
        AsyncStorage.getItem("birthDate", this.initializeBirthDate)
            .then(res => this.setState({ initialLoading: false }))
            .catch(res => this.setState({ initialLoading: false }));
    }

    render() {
        return (
            <Swiper
                activeDotColor="skyblue"
                loop={false}
            >
                <View style={{ justifyContent: "space-around", flex: 1, paddingBottom: 30 }}>
                    <Text style={[styles.header, styles.text]}>Your birthday will be in:</Text>
                    <Counter
                        birthDate={this.state.birthDate}
                    />
                </View>
                <View style={{ flex: 1 }} >
                    <Settings dateUpdated={this.updateBirthdate} />
                </View>
            </Swiper>);
    }

    initializeBirthDate(error, result) {
        if (!error) {
            this.setState({ birthDate: new Date(Number(result)) });
        }
    }

    updateBirthdate(newDate) {
        this.setState({ birthDate: newDate });
    }
}

const styles = StyleSheet.create({
    text: {
        color: "skyblue",
        textShadowColor: "rgba(255, 255, 255, 1)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    header: {
        fontSize: 40,
        padding: 10,
        paddingTop: 20,
        textAlign: "center",
    },
});

AppRegistry.registerComponent("Summary", () => Summary);