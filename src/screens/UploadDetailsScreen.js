import MainLayout from "../layouts/MainLayout";
import { Text, Image, Button } from "react-native";
import { useCreateDrawing } from "../hooks/useCreateDrawing";
import { CommonActions } from "@react-navigation/native";

const UploadDetailsScreen = ({navigation, route }) => {
    const { asset } = route.params;

    const { loading, createDrawing } = useCreateDrawing();

    const handleSave = async () => {
        const data = {
            description: "hola a todos",
        };
        const result = await createDrawing(data, asset);
        console.log("RESULTADOOOOOOO", result.drawingId);

        /*
            Root
            └── App
                └── Tabs
                    ├── Home
                    ├── Gallery
                    │    └── GalleryDetail
                    └── Settings

                └── Upload
        */
       //borramos todo el historial y creamos uno nuevo que sea tabs gallery gallery detail
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: "Tabs",
                        state: {
                            routes: [
                                {
                                    name: "Gallery",
                                    state: {
                                        index: 1,
                                        routes: [
                                            {
                                                name: "GalleryMain",
                                            },
                                            {
                                                name: "GalleryDetail",
                                                params: {
                                                    id: result.drawingId,
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            })
        );
    };

    console.log("2");
    
    return(
        <MainLayout>
            {asset && (
                <Image
                    source = {{ uri: asset.uri }}
                    style = {{ width: 200, height: 200 }}
                />
            )}
            <Text>UploadDetailsScreen</Text>
            <Text>Aca van campos extras</Text>
            <Button title = "Guardar todo" disabled = {loading} onPress = {handleSave}/>
        </MainLayout>
    )
}

export default UploadDetailsScreen;
