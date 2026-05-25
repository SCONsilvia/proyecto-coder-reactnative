import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import UploadStack from "./UploadStack";

const Stack = createNativeStackNavigator();


const AppStack = () => {

    return (
        <Stack.Navigator initialRouteName="Tabs">

            <Stack.Screen
                name="Tabs"
                component={TabNavigator}

                // Ocultamos el header automático del Stack
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Upload"
                component={UploadStack}
                options={{
                    headerShown: false,
                    presentation: "fullScreenModal"
                }}
            />
        

        </Stack.Navigator>
    ); 
};

export default AppStack;

