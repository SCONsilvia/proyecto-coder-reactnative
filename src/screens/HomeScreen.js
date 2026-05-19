import MainLayout from "../layouts/MainLayout";
import { Text, Button } from "react-native";
import TestInternetScreen from "./TestInternetScreen";
import { getAllDrawings } from "../services/database/drawingRepository";
import Camera from "../components/Camera/Camera";
import Gallery from "../components/Gallery/Gallery";
import { useSelector } from "react-redux";

const HomeScreen = ({navigation}) => {
    const uid = useSelector(state => state.user.uid);


    const ob = async () => {
        console.log("Aca");
        
        const res = await getAllDrawings(uid);
        console.log("data",res);
        console.log("AcaB");
        
    }
    return(
        <MainLayout>
            <Text>HomeScreen</Text>
            <Text>Hello</Text>
            <Camera/>
            <Gallery/>
            <Button title="a" onPress={ob}/>
            <TestInternetScreen/>
        </MainLayout>
    )
}

export default HomeScreen;
