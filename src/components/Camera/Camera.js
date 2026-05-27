import { openCamera } from "../../services/media/mediaSevirce";
import AppButton from "../UI/AppButton";

export default function Camera({ onSelect, style }) {

    const handleOpenCamera = async () => {
        try {
            const asset = await openCamera();

            if (!asset) return;

            onSelect(asset);

        } catch(err) {
            console.log(err);
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
