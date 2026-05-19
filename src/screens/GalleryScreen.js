import MainLayout from "../layouts/MainLayout";
import { Text } from "react-native";
import Galeria from "../components/Galeria/Galeria";

const GalleryScreen = ({navigation}) => {
    return(
        <MainLayout>
            <Text>Gallery</Text>
            <Galeria/>
        </MainLayout>
    )
}

export default GalleryScreen;
