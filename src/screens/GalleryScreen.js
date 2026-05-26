import MainLayout from "../layouts/MainLayout";
import { Text } from "react-native";
import Galeria from "../components/Galeria/Galeria";
import { useGalleryDrawings } from "../hooks/useGalleryDrawings";

const GalleryScreen = ({navigation}) => {
    const { items, loading } = useGalleryDrawings();

    return(
        <MainLayout>
            <Text>Gallery</Text>
            <Galeria items = {items} loading = {loading}/>
        </MainLayout>
    )
}

export default GalleryScreen;
