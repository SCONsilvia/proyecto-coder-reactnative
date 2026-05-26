import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Pressable,
    ActivityIndicator
} from "react-native";

const DrawingForm = ({
    title,
    setTitle,
    description,
    setDescription,

    showChallenge=false,

    isChallenge,
    setIsChallenge,

    challenge,
    challengeLoading,

    loading,
    onSubmit,
    buttonTitle = "Guardar",
}) => {

    return (
        <View style={styles.form}>

            <Text style={styles.label}>
                Título
            </Text>

            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Ponle un título"
                style={styles.input}
            />

            <Text style={styles.label}>
                Descripción
            </Text>

            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Agregar descripción"
                style={[styles.input, styles.textarea]}
                multiline
            />
            {
                showChallenge && (
                    <>
                        <Pressable
                            style={styles.challengeRow}
                            onPress={() => {

                                const nextIsChallenge = !isChallenge;

                                setIsChallenge(nextIsChallenge);

                                if (nextIsChallenge) {
                                    !title && setTitle(challenge.title);
                                }

                                if (
                                    !nextIsChallenge &&
                                    title === challenge.title
                                ) {
                                    setTitle("");
                                }
                            }}
                        >
                            <View
                                style={[
                                    styles.checkbox,
                                    isChallenge && styles.checkboxActive
                                ]}
                            />

                            <Text>
                                Participar en el reto diario
                            </Text>

                        </Pressable>

                        {challengeLoading && (
                            <ActivityIndicator />
                        )}

                        {!challengeLoading && challenge && (
                            <View style={styles.challengeCard}>
                                <Text>
                                    {challenge.title}
                                </Text>
                            </View>
                        )}
                    </>
                )
            }

            <Button
                title={buttonTitle}
                disabled={loading}
                onPress={onSubmit}
            />

        </View>
    );
};

export default DrawingForm;

const styles = StyleSheet.create({

    form: {
        gap: 16,
    },

    label: {
        fontSize: 16,
        fontWeight: "600",
    },

    input: {
        borderWidth: 1,
        borderColor: "#d4d4d4",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: "#fff",
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
        borderColor: "#555",
    },

    checkboxActive: {
        backgroundColor: "#222",
    },

    challengeText: {
        fontSize: 15,
    },

    challengeCard: {
        padding: 14,
        borderRadius: 14,
        backgroundColor: "#f3f3f3",
    },

    challengeTitle: {
        fontSize: 13,
        color: "#666",
        marginBottom: 4,
    },

    challengeName: {
        fontSize: 16,
        fontWeight: "600",
    },
});