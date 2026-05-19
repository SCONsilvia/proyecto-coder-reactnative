import { Button, Image, View } from "react-native";
import { useCreateDrawing } from "../../hooks/useCreateDrawing.js";

export default function Gallery() {

    const { image, loading, createFromGallery } = useCreateDrawing();

    return (
        <View>
            <Button title = "Galería" onPress = {createFromGallery} />

            {image && (
                <Image
                    source = {{ uri: image }}
                    style = {{ width: 200, height: 200 }}
                />
            )}
        </View>
    );
}
