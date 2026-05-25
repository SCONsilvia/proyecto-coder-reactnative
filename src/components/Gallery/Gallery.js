import { Button, Image, View } from "react-native";
import { useCreateDrawing } from "../../hooks/useCreateDrawing.js";
import { openGallery } from "../../services/media/mediaSevirce.js";

export default function Gallery({ onSelect }) {

    const handleOpenGallery = async () => {
        try {
            const asset = await openGallery();

            if (!asset) return;

            onSelect(asset);

        } catch(err) {
            console.log(err);
        }
    };

    return (
        <Button
            title = "Galería"
            onPress = {handleOpenGallery}
        />
    );
}
