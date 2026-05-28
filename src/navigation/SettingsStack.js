import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/SettingsScreen";
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
                }}
            />
        </Stack.Navigator>
    )
}

export default SettingsStack;
