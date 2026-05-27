import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import AppInput from "../UI/AppInput";
import AppButton from "../UI/AppButton";
import { useTheme } from "../../constants/theme";

const DrawingForm = ({
    title,
    setTitle,
    description,
    setDescription,

    showChallenge = false,

    isChallenge,
    setIsChallenge,

    challenge,
    challengeLoading,

    loading,
    onSubmit,
    buttonTitle = "Guardar",

    challengeError,
}) => {
    const { colors } = useTheme();

    return (
        <View style = {styles.form}>

            <Text style = {[styles.label, { color: colors.textPrimary }]}>Título</Text>
            <AppInput
                value = {title}
                onChangeText = {setTitle}
                placeholder = "Ponle un título"
            />

            <Text style = {[styles.label, { color: colors.textPrimary }]}>Descripción</Text>
            <AppInput
                value = {description}
                onChangeText = {setDescription}
                placeholder = "Agregar descripción"
                style = {styles.textarea}
                multiline
            />

            {showChallenge && (
                <>
                    <Pressable
                        style = {styles.challengeRow}
                        onPress = {() => {

                            const next = !isChallenge;

                            setIsChallenge(next);

                            if (next && !title && challenge) setTitle(challenge.title);

                            if (!next && challenge && title === challenge.title) setTitle("");
                        }}
                    >
                        <View style = {[
                            styles.checkbox,
                            { borderColor: colors.primary },
                            isChallenge && { backgroundColor: colors.primary },
                        ]} />
                        <Text style = {{ color: colors.textPrimary, fontSize: 15 }}>
                            Participar en el reto diario
                        </Text>
                    </Pressable>

                    {challengeLoading && <ActivityIndicator color = {colors.primary} />}

                    {!challengeLoading && challenge && (
                        <View style = {[styles.challengeCard, {
                            backgroundColor: colors.surfaceVariant,
                            borderColor: colors.border,
                        }]}>
                            <Text style = {{ color: colors.textPrimary, fontWeight: "600" }}>
                                {challenge.title}
                            </Text>
                        </View>
                    )}

                    {!challengeLoading && !challenge && challengeError && (
                        <Text style={{ color: colors.error ?? "#e53e3e", fontSize: 13 }}>
                            No se pudo cargar el reto de hoy
                        </Text>
                    )}
                </>
            )}

            <AppButton title = {buttonTitle} loading = {loading} onPress = {onSubmit} />

        </View>
    );
};

export default DrawingForm;

const styles = StyleSheet.create({
    form: {
        gap: 12,
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
    },
    textarea: {
        minHeight: 120,
        textAlignVertical: "top",
    },
    challengeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
    },
    challengeCard: {
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
    },
});
