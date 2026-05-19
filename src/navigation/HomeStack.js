import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { Pressable, Text, Alert } from "react-native";
import Header from "../components/Header/Header";
import { Ionicons } from "@expo/vector-icons";
import AddDrawingScreen from "../screens/AddDrawingScreen";
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
                    //titulo del header
                    headerTitle: "Inicio",
                    //Boton a la derecha del header
                    headerRight : () => (
                        <Pressable
                            onPress={() =>
                                Alert.alert("Información", "Pantalla Home")
                            }
                        >
                            <Text>Info</Text>
                        </Pressable>
                    )
                }}
            />

            <Stack.Screen 
                name = "AddDrawing" 
                component = {AddDrawingScreen} 
                options = {{
                    //titulo del header
                    headerTitle: "Guardar creacion",
                }}
            />
        </Stack.Navigator>
    )
}

export default HomeStack;
