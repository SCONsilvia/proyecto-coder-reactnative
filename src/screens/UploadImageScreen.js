import MainLayout from "../layouts/MainLayout";
import { Text, Button, Image } from "react-native";
import Camera from "../components/Camera/Camera";
import Gallery from "../components/Gallery/Gallery";
import { useState } from "react";

const UploadImageScreen = ({navigation}) => {
    const [asset, setAsset] = useState()

    const handleSelect = (asset) => {
        setAsset(asset);
    };

    console.log(asset);
    
    
    return(
        <MainLayout>
            <Text>UploadImageScreen</Text>
            {asset && (
                <Image
                    source = {{ uri: asset.uri }}
                    style = {{ width: 200, height: 200 }}
                />
            )}
            <Camera onSelect = {handleSelect}/>
            <Gallery onSelect = {handleSelect}/>
            <Button title = "Continue" disabled = {!asset} onPress = {() => navigation.navigate("UploadDetailsScreen", {asset} )}/>
        </MainLayout>
    )
}

export default UploadImageScreen;
