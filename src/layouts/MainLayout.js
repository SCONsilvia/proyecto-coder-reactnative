import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../constants/theme";

const MainLayout = ({ children }) => {
    const { colors } = useTheme();

    return (
        <SafeAreaView
            style = {{ flex: 1, backgroundColor: colors.background }}
            edges = {['left', 'right', 'bottom']}
        >
            {children}
        </SafeAreaView>
    );
};

export default MainLayout;
