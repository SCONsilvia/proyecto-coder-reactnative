import { openGallery } from "../../services/media/mediaSevirce.js";
import AppButton from "../UI/AppButton.js";

export default function Gallery({ onSelect, style }) {

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
        <AppButton
            title = "Galería"
            variant = "outline"
            onPress = {handleOpenGallery}
            style = {style}
        />
    );
}
