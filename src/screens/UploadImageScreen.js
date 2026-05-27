import MainLayout from "../layouts/MainLayout";
import { Text, Image, View, StyleSheet } from "react-native";
import Camera from "../components/Camera/Camera";
import Gallery from "../components/Gallery/Gallery";
import { useState } from "react";
import AppButton from "../components/UI/AppButton";
import { useTheme } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

const UploadImageScreen = ({ navigation }) => {
    const [asset, setAsset] = useState(null);
    const { colors } = useTheme();

    return (
        <MainLayout>
            <View style = {styles.container}>

                <Text style = {[styles.title, { color: colors.textPrimary }]}>
                    Seleccioná una imagen
                </Text>

                <View style = {[styles.preview, {
                    backgroundColor: colors.surfaceVariant,
                    borderColor: colors.border,
                }]}>
                    {asset ? (
                        <Image
                            source = {{ uri: asset.uri }}
                            style = {styles.image}
                            resizeMode = "cover"
                        />
                    ) : (
                        <View style = {styles.placeholder}>
                            <Ionicons name = "image-outline" size = {52} color = {colors.muted} />
                            <Text style = {[styles.placeholderText, { color: colors.muted }]}>
                                Ninguna imagen seleccionada
                            </Text>
                        </View>
                    )}
                </View>

                <View style = {styles.row}>
                    <Camera onSelect = {setAsset} style = {styles.rowButton} />
                    <Gallery onSelect = {setAsset} style = {styles.rowButton} />
                </View>

                <AppButton
                    title = "Continuar"
                    onPress = {() => navigation.navigate("UploadDetailsScreen", { asset })}
                    disabled = {!asset}
                />

            </View>
        </MainLayout>
    );
};

export default UploadImageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
    },
    preview: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 16,
        borderWidth: 1,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    placeholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
    },
    placeholderText: {
        fontSize: 14,
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    rowButton: {
        flex: 1,
    },
});


