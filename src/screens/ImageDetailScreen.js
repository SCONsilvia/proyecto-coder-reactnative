import MainLayout from "../layouts/MainLayout";
import ItemDetail from "../components/ItemDetail/ItemDetail";
import { ActivityIndicator, Text } from "react-native";
import { useDrawing } from "../hooks/useDrawing";

const ImageDetailScreen = ({ route }) => {

    const { id } = route.params;
    const { item, loading } = useDrawing(id);

    return (
        <MainLayout>
            {loading && <ActivityIndicator />}

            {!loading && !item && (
                <Text>No encontrado</Text>
            )}

            {item && <ItemDetail item={item} />}
        </MainLayout>
    );
};

export default ImageDetailScreen;
