import MainLayout from "../layouts/MainLayout";
import ItemDetail from "../components/ItemDetail/ItemDetail";
import { ActivityIndicator, Text, KeyboardAvoidingView } from "react-native";
import { useDrawing } from "../hooks/useDrawing";
import { Platform } from "react-native";
import { useTheme } from "../constants/theme";

const ImageDetailScreen = ({ route }) => {
    const { colors } = useTheme();

    const { id } = route.params;
    const { item, loading, refresh, refreshing, error } = useDrawing(id);

    return (
        <MainLayout>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset = {120}
            >
                {loading && <ActivityIndicator />}

                {!loading && error && (
                    <Text style={{ color: colors.error, padding: 16 }}>
                        {error}
                    </Text>
                )}

                {!loading && !error && !item && (
                    <Text>No encontrado</Text>
                )}

                {item && <ItemDetail item={item} onRefresh = {refresh} refreshing = {refreshing}/>}
            </KeyboardAvoidingView>
        </MainLayout>
    );
};

export default ImageDetailScreen;
