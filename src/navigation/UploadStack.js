import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text, Alert } from "react-native";
import { defaultHeader } from "./defaultHeaderOptions";
import UploadDetailsScreen from "../screens/UploadDetailsScreen";
import UploadImageScreen from "../screens/UploadImageScreen";

const Stack = createNativeStackNavigator();

const UploadStack = () => {
    return(
        <Stack.Navigator 
            initialRouteName = "UploadImageScreen"
            screenOptions = { defaultHeader }
        >
            <Stack.Screen 
                name = "UploadImageScreen" 
                component = {UploadImageScreen} 
                options = {{
                    headerTitle: "Subir dibujo",
                }}
            />

            <Stack.Screen 
                name = "UploadDetailsScreen" 
                component = {UploadDetailsScreen} 
                options = {{
                    //titulo del header
                    headerTitle: "Revisar dibujo",
                    //Boton a la derecha del header
                    headerRight : () => (
                        <Pressable
                            onPress={() =>
                                Alert.alert("Información", "Pantalla UploadDetailsScreen")
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

export default UploadStack;
