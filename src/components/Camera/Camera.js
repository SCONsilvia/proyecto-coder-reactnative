import { openCamera } from "../../services/media/mediaSevirce";
import AppButton from "../UI/AppButton";
import { Alert } from "react-native";

export default function Camera({ onSelect, style }) {

    const handleOpenCamera = async () => {
        try {
            const asset = await openCamera();

            if (!asset) return;

            onSelect(asset);

        } catch (err) {
            Alert.alert(
                "Error al abrir la cámara",
                "No se pudo acceder a la cámara. Verificá los permisos.",
            );
        }
    };

    return (
        <AppButton
            title  ="Cámara"
            variant = "outline"
            onPress = {handleOpenCamera}
            style = {style}
        />
    );
}
