import MainLayout from "../layouts/MainLayout";
import { Text, Button } from "react-native";
import TestInternetScreen from "./TestInternetScreen";
import TodayChallenge from "../components/TodayChallenge/TodayChallenge";
import ProgressCalendar from "../components/ProgressCalendar/ProgressCalendar";

const HomeScreen = ({navigation}) => {
console.log("1");

    return(
        <MainLayout>
            <Text>Bienvenido</Text>
            <ProgressCalendar/>
            <TodayChallenge/>
            <Button title = "Subir mi dibujo" onPress = {() => navigation.navigate("Upload")}/>
            <TestInternetScreen/>
        </MainLayout>
    )
}

export default HomeScreen;
