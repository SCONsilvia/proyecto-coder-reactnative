import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header/Header";
import { StyleSheet, View } from "react-native";

const MainLayout = ({ children }) => {
    return (
        <SafeAreaView
            style={{ flex: 1 }}
            edges={['left', 'right', 'bottom']} // quitamos el top porque Stack ya tiene su propio calculo para poner el espacio 
        >
            {children}
        </SafeAreaView>
    )
}

export default MainLayout;
