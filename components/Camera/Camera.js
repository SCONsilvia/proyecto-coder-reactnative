import { View, Button, Image } from "react-native";
import { useState } from "react";
import { openCamera } from "../../services/media/mediaSevirce";
import { createDrawingWithImage } from "../../services/database/drawingService";
import { useSelector } from "react-redux";

export default function Camera() {

    const [photo, setPhoto] = useState(null);
    const uid = useSelector(state => state.user.uid);

    const handleOpenCamera = async () => {
        try{
            const asset = await openCamera();

            if (!asset) return;

            const data = {
                description:  "hola a todos",
            }

            const result = await createDrawingWithImage(data, asset, uid);

            console.log("la repsuesta", result);
            
            setPhoto(result.savedUri);
            
        }catch(err){
            console.log("error",err);
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
