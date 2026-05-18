import { Button, Image, View } from "react-native";
import { use, useState } from "react";
import { openGallery } from "../../services/media/mediaSevirce";
import { saveImage } from "../../services/storage/imageStorage";
import { useSelector } from "react-redux";

export default function Gallery() {
    
    const [image, setImage] = useState(null);
    const uid = useSelector(state => state.user.uid);

    const handleOpen = async () => {
        const asset = await openGallery();
        //asset.uri = //file:///data/user/0/host.exp.exponent/cache/ImagePicker/abc123.jpg  Y ESTO ESTA EN LA CACHE TEMPOral puede borrarse cuadno cerra la ap, android limpia memoria, reistalas la app, el SO necesita espacio
        if (!asset) return;

        // guardar permanente
        //console.log("a",asset.uri);
        //const savedUri = await saveImage(asset.uri, uid);

        //setImage(savedUri);
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