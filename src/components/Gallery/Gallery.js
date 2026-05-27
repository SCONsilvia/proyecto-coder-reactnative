import { openGallery } from "../../services/media/mediaSevirce.js";
import AppButton from "../UI/AppButton.js";
import { Alert } from "react-native";

export default function Gallery({ onSelect, style }) {

    const handleOpenGallery = async () => {
        try {
            const asset = await openGallery();

            if (!asset) return;

            onSelect(asset);

        } catch (err) {
            Alert.alert(
                "Error al abrir la galería",
                "No se pudo acceder a la galería. Verificá los permisos.",
            );
        }
    };

    return (
        <AppButton
            title = "Galería"
            variant = "outline"
            onPress = {handleOpenGallery}
            style = {style}
        />
    );
}
