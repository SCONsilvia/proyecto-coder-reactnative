import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { defaultHeader } from "./defaultHeaderOptions";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return(
        <Stack.Navigator 
            initialRouteName = "HomeMain"
            screenOptions = { defaultHeader }
        >
            <Stack.Screen 
                name = "HomeMain" 
                component = {HomeScreen} 
                options = {{
                    headerTitle: "Inicio",
                }}
            />

        </Stack.Navigator>
    )
}

export default HomeStack;
