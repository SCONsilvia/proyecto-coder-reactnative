import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function SplashScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
