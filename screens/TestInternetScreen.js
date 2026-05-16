import { View, Text, Button } from "react-native";
import * as Network from "expo-network";
import { useState } from "react";

export default function TestInternetScreen() {

    const [status, setStatus] = useState("Sin comprobar");

    const checkInternet = async () => {
        const state = await Network.getNetworkStateAsync();

        const hasInternet =
        state.isConnected &&
        state.isInternetReachable !== false;

        setStatus(
            hasInternet
                ? "✅ Hay internet"
                : "❌ No hay internet"
        );
    };

    return (
        <View style={{ marginTop: 100, alignItems: "center" }}>
        <Text>{status}</Text>

        <Button
            title="Comprobar Internet"
            onPress={checkInternet}
        />
        </View>
    );
}