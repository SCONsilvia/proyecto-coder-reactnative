import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import UploadStack from "./UploadStack";
import ImageDetailScreen from "../screens/ImageDetailScreen";
import GalleryDayScreen from "../screens/GalleryDayScreen";
import { defaultHeader } from "./defaultHeaderOptions";

const Stack = createNativeStackNavigator();


const AppStack = () => {

    return (
        <Stack.Navigator initialRouteName="Tabs" screenOptions = { defaultHeader }>

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

            <Stack.Screen
                name="GalleryDayScreen"
                component={GalleryDayScreen}
                options={({ route }) => {
                    const date = route.params?.date;

                    const [year, month, day] = date.split("-");

                    const localDate = new Date(year, month - 1, day);

                    const formatted = localDate.toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                    });
                    //headerTitle: `Dibujos del ${formatted}`
                    return {
                        headerTitle: formatted,
                    };
                }}
            />

            <Stack.Screen
                name="GalleryDetail"
                component={ImageDetailScreen}
                options = {{
                    //titulo del header
                    headerTitle: "Detalle",
                    /*presentation: "transparentModal",
                    animation: "fade"*/
                }}
            />
        

        </Stack.Navigator>
    ); 
};

export default AppStack;

