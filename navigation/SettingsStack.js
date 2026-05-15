import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/SettingsScreen";
import { Pressable, Text, Alert } from "react-native";
import Header from "../components/Header/Header";
import { Ionicons } from "@expo/vector-icons";
import { defaultHeader } from "./defaultHeaderOptions";

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
    return(
        <Stack.Navigator 
            initialRouteName = "SettingsMain"
            screenOptions = { defaultHeader }
        >
            <Stack.Screen 
                name = "SettingsMain" 
                component = {SettingsScreen} 
                options = {{
                    headerTitle: "Configuracion",
                    headerRight : () => (
                        <Pressable
                            onPress={() =>
                                Alert.alert("Información", "Pantalla SettingsStack")
                            }
                        >
                            <Text>Info</Text>
                        </Pressable>
                    )
                }}
            />
        </Stack.Navigator>
    )
}

export default SettingsStack;
