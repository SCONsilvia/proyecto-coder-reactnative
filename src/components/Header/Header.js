import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, sizes, typography } from "../../constants/theme";

const Header = ({ title, onBack, rightIcon }) => {
  return (
    <SafeAreaView style = {styles.safeArea} edges={["top"]}>
        <View style = {styles.container}>

        {/* IZQUIERDA */}
        <View style = {styles.side}>
            {onBack && (
            <Pressable onPress = {onBack}
                accessibilityRole = "button"
                accessibilityLabel = "Volver atrás"
            >
                <Ionicons name = "arrow-back" size = {24} />
            </Pressable>
            )}
        </View>

        {/* CENTRO */}
        <Text style = {styles.title} accessibilityRole = "header">{title}</Text>

        {/* DERECHA */}
        <View style = {styles.side}
            accessibilityRole = "button"
            accessibilityLabel = "Abrir alerta"
        >
            {rightIcon}
        </View>

        </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#92d12d",
    },
    container: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: sizes.padding,
        borderBottomWidth: 1,
        backgroundColor: colors.surface,
        borderColor: colors.border,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.textPrimary,
        fontSize: typography.title,
    },
    side: {
        width: 40,
        alignItems: "center",
    },
});

