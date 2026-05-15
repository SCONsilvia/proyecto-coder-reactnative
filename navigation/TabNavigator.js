import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import SettingsStack from "./SettingsStack";
import GalleryStack from "./GalleryStack";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(
        <Tab.Navigator
            initialRouteName = "Home"
            screenOptions = {({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Gallery") {
                        iconName = focused ? "images" : "images-outline";
                    } else if (route.name === "Settings") {
                        iconName = focused ? "settings" : "settings-outline";
                    }
        
                    // Retorna el ícono con el tamaño y color adecuados
                    return <Ionicons name = {iconName} size = {size} color = {color} />;
                },
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                headerShown: false, 
            })}
        >
            <Tab.Screen name = "Home" component = {HomeStack} 
                options = {{
                    tabBarLabel: "Inicio",//acessibilidad
                    tabBarAccessibilityLabel: "Ir a Inicio",
                }}
            />
            <Tab.Screen name = "Gallery" component = {GalleryStack}
                options = {{
                    tabBarLabel: "Galeria",
                    tabBarAccessibilityLabel: "Ir a Galeria",
                }}
            />
            <Tab.Screen name = "Settings" component = {SettingsStack}
                options = {{
                    tabBarLabel: "Configuracion",
                    tabBarAccessibilityLabel: "Ir a Configuracion",
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator;
