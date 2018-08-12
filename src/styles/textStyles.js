
import { StyleSheet } from "react-native";

export const textStyles = StyleSheet.create({
    shadow: {
        textShadowColor: "rgba(255, 255, 255, 2)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 20,
    },
    text: {
        color: "skyblue",
        fontSize: 30,
        textAlign: "center",
    },
    screenHeader:{
        paddingBottom: 25,
        paddingTop: 25,
        textAlign: "center",
    },
});
