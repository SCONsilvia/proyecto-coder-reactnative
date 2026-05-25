import { View, Button, Image } from "react-native";
import { useState } from "react";
import { openCamera } from "../../services/media/mediaSevirce";

export default function Camera({ onSelect }) {

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
        <Button
            title = "Abrir cámara"
            onPress = {handleOpenCamera}
        />
    );
}
