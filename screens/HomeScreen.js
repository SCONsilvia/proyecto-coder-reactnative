import MainLayout from "../layouts/MainLayout";
import { Text } from "react-native";
import TestInternetScreen from "./TestInternetScreen";

const HomeScreen = ({navigation}) => {
    return(
        <MainLayout>
            <Text>HomeScreen</Text>
            <TestInternetScreen/>
        </MainLayout>
    )
}

export default HomeScreen;
