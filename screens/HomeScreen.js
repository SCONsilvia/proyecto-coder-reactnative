import MainLayout from "../layouts/MainLayout";
import { Text, Button } from "react-native";
import TestInternetScreen from "./TestInternetScreen";
import { getAllDrawings } from "../services/database/drawingRepository";

const HomeScreen = ({navigation}) => {

    const ob = async () => {
        console.log("Aca");
        
        const res = await getAllDrawings();
        console.log("data",res);
        console.log("AcaB");
        
    }
    return(
        <MainLayout>
            <Text>HomeScreen</Text>
            <Button title="a" onPress={ob}/>
            <TestInternetScreen/>
        </MainLayout>
    )
}

export default HomeScreen;
