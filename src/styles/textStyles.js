
import { StyleSheet } from "react-native";

export const textStyles = StyleSheet.create({
    shadow: {
        textShadowColor: "rgba(255, 255, 255, 1)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    header: {
        color: "skyblue",
        fontSize: 40,
        padding: 10,
        paddingTop: 20,
        textAlign: "center",
    },
});
