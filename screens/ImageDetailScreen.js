import MainLayout from "../layouts/MainLayout";
import ItemDetailContainer from "../components/ItemDetailContainer/ItemDetailContainer";

const ImageDetailScreen = ({ route }) => {

    const { id } = route.params;

    return (
        <MainLayout>
            <ItemDetailContainer id = {id}/>
        </MainLayout>
    );
};

export default ImageDetailScreen;
