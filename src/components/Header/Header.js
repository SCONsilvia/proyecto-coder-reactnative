import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { sizes, typography, useTheme } from "../../constants/theme";

const Header = ({ title, onBack, rightIcon }) => {
    const { colors } = useTheme();

    return (
        <SafeAreaView style = {{ backgroundColor: colors.headerBackground }} edges = {["top"]}>
            <View style = {[styles.container, {
                backgroundColor: colors.headerBackground,
                borderColor: colors.headerBorder,
            }]}>

                <View style = {styles.side}>
                    {onBack && (
                        <Pressable
                            onPress = {onBack}
                            accessibilityRole = "button"
                            accessibilityLabel = "Volver atrás"
                            style = {styles.backContainer}
                        >
                            <Ionicons name = "arrow-back" size = {24} color = {colors.textPrimary} />
                        </Pressable>
                    )}
                </View>

                <Text style = {[styles.title, { color: colors.headerText }]} accessibilityRole = "header">
                    {title}
                </Text>

                <View style={styles.side} accessibilityRole = "button" accessibilityLabel = "Abrir alerta">
                    {rightIcon}
                </View>

            </View>
        </SafeAreaView>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: sizes.padding,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: typography.title,
        fontWeight: "bold",
    },
    side: {
        width: 48,
        alignItems: "center",
    },
    backContainer: {
        width : 48,
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center"
    },
});
