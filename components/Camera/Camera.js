import { View, Button, Image } from "react-native";
import { useState } from "react";
import { openCamera } from "../../services/media/mediaSevirce";

export default function Camera() {

    const [photo, setPhoto] = useState(null);

    const handleOpenCamera = async () => {
            const asset = await openCamera();

            if (asset) {
            setPhoto(asset.uri);
            }
    };

    return (
        <View>
            <Button
                title="Abrir cámara"
                onPress={handleOpenCamera}
            />

            {photo && (
                <Image
                    source={{ uri: photo }}
                    style={{ width: 200, height: 200 }}
                />
            )}
        </View>
    );
}
