import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "../../constants/theme";

const AppButton = ({
    title,
    onPress,
    variant = "primary",
    loading = false,
    disabled = false,
    style,
}) => {
    const { colors } = useTheme();

    const variants = {
        primary: { bg: colors.primary,   text: "#FFFFFF", border: "transparent" },
        outline: { bg: "transparent",    text: colors.primary, border: colors.primary },
        danger:  { bg: "#C62828",        text: "#FFFFFF", border: "transparent" },
    };

    const v = variants[variant] ?? variants.primary;

    return (
        <Pressable
            onPress = {onPress}
            disabled = {disabled || loading}
            style = {({ pressed }) => [
                styles.button,
                { backgroundColor: v.bg, borderColor: v.border, opacity: pressed || disabled ? 0.7 : 1 },
                style,
            ]}
        >
            {loading
                ? <ActivityIndicator color = {v.text} size = "small" />
                : <Text style = {[styles.text, { color: v.text }]}>{title}</Text>
            }
        </Pressable>
    );
};

export default AppButton;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        minHeight: 50,
    },
    text: {
        fontSize: 16,
        fontWeight: "600",
    },
});
