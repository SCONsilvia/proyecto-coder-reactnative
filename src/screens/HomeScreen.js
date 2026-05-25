import MainLayout from "../layouts/MainLayout";
import { Text, Button } from "react-native";
import TestInternetScreen from "./TestInternetScreen";
import Camera from "../components/Camera/Camera";
import Gallery from "../components/Gallery/Gallery";
import TodayChallenge from "../components/TodayChallenge/TodayChallenge";

const HomeScreen = ({navigation}) => {

    return(
        <MainLayout>
            <Text>HomeScreen</Text>
            <TodayChallenge/>
            <Text>Hello</Text>
            <Camera/>
            <Gallery/>
            <TestInternetScreen/>
        </MainLayout>
    )
}

export default HomeScreen;
