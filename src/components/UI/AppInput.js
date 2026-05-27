import { forwardRef } from "react";
import { TextInput, StyleSheet } from "react-native";
import { useTheme } from "../../constants/theme";

const AppInput = forwardRef(({ style, ...props }, ref) => {
    const { colors } = useTheme();

    return (
        <TextInput
            ref = {ref}
            style = {[
                styles.input,
                {
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    color: colors.textPrimary,
                },
                style,
            ]}
            placeholderTextColor = {colors.muted}
            {...props}
        />
    );
});

export default AppInput;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
    },
});
