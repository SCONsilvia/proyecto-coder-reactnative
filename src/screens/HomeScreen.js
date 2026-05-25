import MainLayout from "../layouts/MainLayout";
import { Text, Button } from "react-native";
import TestInternetScreen from "./TestInternetScreen";
import TodayChallenge from "../components/TodayChallenge/TodayChallenge";

const HomeScreen = ({navigation}) => {
console.log("1");

    return(
        <MainLayout>
            <Text>Bienvenido</Text>
            <TodayChallenge/>
            <Button title = "Subir mi dibujo" onPress = {() => navigation.navigate("Upload")}/>
            <TestInternetScreen/>
        </MainLayout>
    )
}

export default HomeScreen;
