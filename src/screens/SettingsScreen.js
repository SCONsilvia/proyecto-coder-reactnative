import { View, Text, StyleSheet, Switch, Pressable } from "react-native";
import MainLayout from "../layouts/MainLayout";
import { logoutUser } from "../features/auth/authThunks";
import { toggleTheme } from "../features/theme/themeSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "../constants/theme";

const SettingsScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { colors, isDark } = useTheme();

    return (
        <MainLayout>
            <View style = {styles.container}>

                <View style = {[styles.row, {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                }]}>
                    <Text style = {[styles.label, { color: colors.textPrimary }]}>
                        Modo oscuro
                    </Text>
                    <Switch
                        value = {isDark}
                        onValueChange = {() => dispatch(toggleTheme())}
                        trackColor = {{ false: colors.border, true: colors.primary }}
                        thumbColor = {colors.surface}
                    />
                </View>

                <Pressable
                    style = {({ pressed }) => [
                        styles.button,
                        { backgroundColor: pressed ? colors.primaryVariant : colors.primary },
                    ]}
                    onPress = {() => dispatch(logoutUser())}
                >
                    <Text style = {styles.buttonText}>Cerrar sesión</Text>
                </Pressable>

            </View>
        </MainLayout>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 12,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
    },
    button: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});
