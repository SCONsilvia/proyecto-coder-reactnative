import MainLayout from "../layouts/MainLayout";
import {
    Text,
    Image,
    View,
    Pressable,
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    Platform
} from "react-native";

import { useState } from "react";
import { useCreateDrawing } from "../hooks/useCreateDrawing";
import { CommonActions } from "@react-navigation/native";
import { useTodayChallenge } from "../hooks/useTodayChallenge";
import DrawingForm from "../components/DrawingForm/DrawingForm";

const UploadDetailsScreen = ({ navigation, route }) => {

    const { asset } = route.params;

    const { loading, createDrawing, error } = useCreateDrawing();

    const { loading: challengeLoading, challenge, error: challengeError} = useTodayChallenge();

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

        if (!result) {
            Alert.alert(
                "No se pudo guardar",
                error ?? "Ocurrió un error al guardar el dibujo. Intentá de nuevo.",
            );
            return;
        }

        //Reseteamos el stack para que el botón atrás no vuelva a la pantalla de subida
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
                style = {{ flex: 1 }}
                behavior = {Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset = {120}
            >
                <ScrollView
                    contentContainerStyle = {{   
                        padding: 20 
                    }}
                    keyboardShouldPersistTaps = "handled"
                >

                    <Image
                        source = {{ uri: asset.uri }}
                        style = {styles.image}
                    />

                    <DrawingForm
                        title = {title}
                        setTitle = {setTitle}
                        description = {description}
                        setDescription = {setDescription}

                        showChallenge = {true}

                        isChallenge = {isChallenge}
                        setIsChallenge = {setIsChallenge}

                        challenge = {challenge}
                        challengeLoading = {challengeLoading}

                        loading = {loading}

                        onSubmit = {handleSave}
                        challengeError={challengeError}
                    />
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

});
