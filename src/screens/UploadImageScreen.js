import MainLayout from "../layouts/MainLayout";
import { Text, Button } from "react-native";
import Camera from "../components/Camera/Camera";
import Gallery from "../components/Gallery/Gallery";

const UploadImageScreen = ({navigation}) => {
    console.log("3");
    
    return(
        <MainLayout>
            <Text>UploadImageScreen</Text>
            <Camera/>
            <Gallery/>
            <Button title = "Continue" onPress = {() => navigation.navigate("UploadDetailsScreen")}/>
        </MainLayout>
    )
}

export default UploadImageScreen;
