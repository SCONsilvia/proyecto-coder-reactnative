import MainLayout from "../layouts/MainLayout";
import { Text, Button } from "react-native";
import { logoutUser } from "../features/auth/authThunks";
import { useDispatch } from "react-redux";


const SettingsScreen = ({navigation}) => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        
         dispatch(logoutUser());
    };

    return(
        <MainLayout>
            <Text>SettingsScreen</Text>
            <Button title="Logout" onPress={handleLogout} />
        </MainLayout>
    )
}

export default SettingsScreen;
