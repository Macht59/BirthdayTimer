import React from "react";
import { AppRegistry, View, StyleSheet } from "react-native";
import Counter from "./counter.component";
import Swiper from "react-native-swiper";
import Settings from "./settings.component";
import AdBar from "./adBar.component";

export default class Summary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            birthDate: this.props.birthDate,
        };

        this.updateBirthdate = this.updateBirthdate.bind(this);
    }

    render() {
        return (
            <Swiper
                activeDotColor="skyblue"
                loop={false}
            >
                <View style={styles.slideContainer}>
                    <Counter birthDate={this.state.birthDate} />
                    <AdBar />
                </View>
                <View style={styles.slideContainer}>
                    <Settings dateUpdated={this.updateBirthdate} birthDate={this.state.birthDate} maximumAllowedDate={this.props.maximumAllowedDate} />
                </View>
            </Swiper>
        );
    }

    updateBirthdate(newDate) {
        this.setState({ birthDate: newDate });
    }
}

const styles = StyleSheet.create({
    slideContainer: {
        flex: 1,
        alignContent: "center",
        justifyContent: "space-between",
        marginBottom: 50,
        marginTop: 24,
    },
});

AppRegistry.registerComponent("Summary", () => Summary);