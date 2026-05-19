import { Button, Image, View } from "react-native";
import { use, useState } from "react";
import { openGallery } from "../../services/media/mediaSevirce";
import { saveImage } from "../../services/storage/imageStorage";
import { useSelector, useDispatch } from "react-redux";
import { createDrawingWithImage } from "../../services/database/drawingService";
import { drawingChanged } from "../../features/drawings/drawingsSlice";


export default function Gallery() {
    const dispatch = useDispatch();
    
    const [image, setImage] = useState(null);
    const uid = useSelector(state => state.user.uid);

    const handleOpen = async () => {
        try{
            const asset = await openGallery();
            //asset.uri = //file:///data/user/0/host.exp.exponent/cache/ImagePicker/abc123.jpg  Y ESTO ESTA EN LA CACHE TEMPOral puede borrarse cuadno cerra la ap, android limpia memoria, reistalas la app, el SO necesita espacio
            if (!asset) return;

            const data = {
                description:  "hola a todos",
            }

            const result = await createDrawingWithImage(data, asset, uid);
            console.log("la repsuesta", result);
            dispatch(drawingChanged());
            
            setImage(result.savedUri);
        }catch(err){
            console.log("Error c", err);
            
        }
    };

    return (
        <View>
            <Button title="Galería" onPress={handleOpen} />

            {image && (
                <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
                />
            )}
        </View>
  );
}