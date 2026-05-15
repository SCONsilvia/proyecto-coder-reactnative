import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import SplashScreen from "../screens/SplashScreen";

import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const uid = useSelector(state => state.user.uid);
    const authChecked = useSelector(state => state.user.authChecked);

    // 🧠 Firebase todavía no respondió
    if (!authChecked) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator>


            { uid ? (

                // Usuario autenticado → App privada
                <Stack.Screen
                    name="App"//navegacion publica
                    component={AppStack}
                    options={{ headerShown: false }}
                />

            ) : (

                // Usuario NO autenticado → Login/Register
                <Stack.Screen
                    name="Auth"//navegacion privada
                    component={AuthStack}
                    options={{ headerShown: false }}
                />

            )}

        </Stack.Navigator>
    );
};

export default RootNavigator;

