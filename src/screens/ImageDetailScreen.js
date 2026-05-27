import MainLayout from "../layouts/MainLayout";
import ItemDetail from "../components/ItemDetail/ItemDetail";
import { ActivityIndicator, Text, KeyboardAvoidingView } from "react-native";
import { useDrawing } from "../hooks/useDrawing";
import { Platform } from "react-native";

const ImageDetailScreen = ({ route }) => {

    const { id } = route.params;
    const { item, loading } = useDrawing(id);

    return (
        <MainLayout>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset = {120}
            >
                {loading && <ActivityIndicator />}

                {!loading && !item && (
                    <Text>No encontrado</Text>
                )}

                {item && <ItemDetail item={item} />}
            </KeyboardAvoidingView>
        </MainLayout>
    );
};

export default ImageDetailScreen;
