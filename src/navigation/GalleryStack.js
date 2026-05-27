import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GalleryScreen from "../screens/GalleryScreen";
import { Pressable, Text, Alert } from "react-native";
import { defaultHeader } from "./defaultHeaderOptions";

const Stack = createNativeStackNavigator();

const GalleryStack = () => {
    return(
        <Stack.Navigator 
            initialRouteName = "GalleryMain"
            screenOptions = { defaultHeader }
        >
            <Stack.Screen 
                name = "GalleryMain" 
                component = {GalleryScreen} 
                options = {{
                    //titulo del header
                    headerTitle: "Galeria",
                    //Boton a la derecha del header
                    headerRight : () => (
                        <Pressable
                            onPress={() =>
                                Alert.alert("Información", "Pantalla Galeria")
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

export default GalleryStack;
