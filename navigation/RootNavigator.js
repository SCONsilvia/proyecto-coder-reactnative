import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import SplashScreen from "../screens/SplashScreen";
import EmailVerificationScreen from "../screens/EmailVerificationScreen";

import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const uid = useSelector(state => state.user.uid);
    const authChecked = useSelector(state => state.user.authChecked);
    const emailVerified = useSelector(state => state.user.emailVerified);

    // 🧠 Firebase todavía no respondió
    if (!authChecked) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator>
            
            {!uid && (
                <Stack.Screen 
                    name="Auth" 
                    component={AuthStack} 
                    options={{ headerShown: false }}
                    
                />
            )}

            {uid && !emailVerified && (
                <Stack.Screen
                    name="EmailVerification"
                    component={EmailVerificationScreen}
                    options={{ headerShown: false }}
                />
            )}

            {uid && emailVerified && (
                <Stack.Screen 
                    name="App" 
                    component={AppStack} 
                    options={{ headerShown: false }}
                />
            )}

        </Stack.Navigator>
    );
};

export default RootNavigator;

