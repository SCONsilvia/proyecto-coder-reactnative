import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GalleryScreen from "../screens/GalleryScreen";
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
                    headerTitle: "Galeria",
                }}
            />
        </Stack.Navigator>
    )
}

export default GalleryStack;
