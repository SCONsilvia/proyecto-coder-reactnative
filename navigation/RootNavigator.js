import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator initialRouteName = "Tabs">

            <Stack.Screen
                name = "Tabs"
                component = {TabNavigator}
                options = {{ headerShown: false }}
            />

        </Stack.Navigator>
    );
};

export default RootNavigator;


