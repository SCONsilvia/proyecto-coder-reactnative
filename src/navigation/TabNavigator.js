import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import SettingsStack from "./SettingsStack";
import GalleryStack from "./GalleryStack";
import { useTheme } from "../constants/theme";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Gallery") {
                        iconName = focused ? "images" : "images-outline";
                    } else if (route.name === "Settings") {
                        iconName = focused ? "settings" : "settings-outline";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.tabBarActive,
                tabBarInactiveTintColor: colors.tabBarInactive,
                tabBarStyle: { backgroundColor: colors.tabBarBackground },
                headerShown: false,
            })}
        >
            <Tab.Screen name = "Home" component = {HomeStack}
                options={{ tabBarLabel: "Inicio", tabBarAccessibilityLabel: "Ir a Inicio" }}
            />
            <Tab.Screen name = "Gallery" component = {GalleryStack}
                options={{ tabBarLabel: "Galeria", tabBarAccessibilityLabel: "Ir a Galeria" }}
            />
            <Tab.Screen name = "Settings" component = {SettingsStack}
                options = {{ tabBarLabel: "Configuracion", tabBarAccessibilityLabel: "Ir a Configuracion" }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
