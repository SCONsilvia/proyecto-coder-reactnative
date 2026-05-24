import { View, Button, Image } from "react-native";
import { useState } from "react";
import { openCamera } from "../../services/media/mediaSevirce";
import { createDrawingWithImage } from "../../services/database/drawingService";
import { useSelector, useDispatch } from "react-redux";
import { drawingChanged } from "../../features/drawings/drawingsSlice";

export default function Camera() {
    const dispatch = useDispatch();

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
            
            setPhoto(result.savedUri);
            
            dispatch(drawingChanged());
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
