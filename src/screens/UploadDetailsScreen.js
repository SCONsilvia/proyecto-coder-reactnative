import MainLayout from "../layouts/MainLayout";
import {
    Text,
    Image,
    Button,
    TextInput,
    View,
    Pressable,
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import { Platform } from "react-native";

import { useState } from "react";
import { useCreateDrawing } from "../hooks/useCreateDrawing";
import { CommonActions } from "@react-navigation/native";
import { useTodayChallenge } from "../hooks/useTodayChallenge";

const UploadDetailsScreen = ({ navigation, route }) => {

    const { asset } = route.params;

    const { loading, createDrawing } = useCreateDrawing();

    const { loading: challengeLoading, challenge} = useTodayChallenge();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isChallenge, setIsChallenge] = useState(false);

    const handleSave = async () => {

        const data = {
            title,
            description,
            challengeId: isChallenge ? challenge?.id : null,
        };

        const result = await createDrawing(data, asset);

        /*
            Root
            └── App
                └── Tabs
                    ├── Home
                    ├── Gallery
                    │    └── GalleryDetail
                    └── Settings

                └── Upload
        */
       //borramos todo el historial y creamos uno nuevo que sea tabs gallery gallery detail
       /* navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: "Tabs",
                        state: {
                            routes: [
                                {
                                    name: "Gallery",
                                    state: {
                                        index: 1,
                                        routes: [
                                            {
                                                name: "GalleryMain",
                                            },
                                            {
                                                name: "GalleryDetail",
                                                params: {
                                                    id: result.drawingId,
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            })
        );*/
        //reiniciamos la navegacion para que back no te lleve a Detalles de la imagne a editar
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    {
                        name: "Tabs",
                    },
                    {
                        name: "GalleryDetail",
                        params: {
                            id: result.drawingId,
                        },
                    },
                ],
            })
        );
    };

    return (
        <MainLayout>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={80}
            >
                <ScrollView
                    contentContainerStyle={{   
                        flexGrow: 1,
                        padding: 20 
                    }}
                    keyboardShouldPersistTaps="handled"
                >

                    <Image
                        source={{ uri: asset.uri }}
                        style={styles.image}
                    />

                    <View style={styles.form}>

                        <Text style={styles.label}>
                            Título
                        </Text>

                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Ponle un título a tu obra"
                            style={styles.input}
                        />

                        <Text style={styles.label}>
                            Descripcion
                        </Text>

                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Agregar descripcion"
                            style={[styles.input, styles.textarea]}
                            multiline
                        />

                        <Pressable
                            style={styles.challengeRow}
                            onPress={() => {
                                    setIsChallenge(prev => !prev)
                                    !title && setTitle(challenge.title);
                                    title === challenge.title & isChallenge && setTitle("");
                                }
                            }
                        >

                            <View style={[
                                styles.checkbox,
                                isChallenge && styles.checkboxActive
                            ]} />

                            <Text style={styles.challengeText}>
                                Participar en el reto diario
                            </Text>

                        </Pressable>

                        {challengeLoading && (
                            <ActivityIndicator />
                        )}

                        {!challengeLoading && challenge && (
                            <View style={styles.challengeCard}>
                                <Text style={styles.challengeTitle}>
                                    Reto de hoy
                                </Text>

                                <Text style={styles.challengeName}>
                                    {challenge.title}
                                </Text>
                            </View>
                        )}

                        <Button
                            title="Guardar dibujo"
                            disabled={loading}
                            onPress={handleSave}
                        />

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </MainLayout>
    );
};

export default UploadDetailsScreen;

const styles = StyleSheet.create({

    image: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 18,
        marginBottom: 20,
    },

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
