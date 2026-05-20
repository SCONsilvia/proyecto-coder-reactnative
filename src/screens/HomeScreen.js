import MainLayout from "../layouts/MainLayout";
import { Text, Button } from "react-native";
import TestInternetScreen from "./TestInternetScreen";
import { getAllDrawings } from "../services/database/drawingRepository";
import Camera from "../components/Camera/Camera";
import Gallery from "../components/Gallery/Gallery";
import { useSelector } from "react-redux";

const HomeScreen = ({navigation}) => {

    return(
        <MainLayout>
            <Text>HomeScreen</Text>
            <Text>Hello</Text>
            <Camera/>
            <Gallery/>
            <TestInternetScreen/>
        </MainLayout>
    )
}

export default HomeScreen;
