import MainLayout from "../layouts/MainLayout";
import { Text } from "react-native";
import { useRoute } from "@react-navigation/native";

const ImageDetailScreen = ({navigation}) => {
    const route = useRoute();

    const { imageId } = route.params;

    console.log(imageId);

    return(
        <MainLayout>
            <Text>Details</Text>
        </MainLayout>
    )
}

export default ImageDetailScreen;
