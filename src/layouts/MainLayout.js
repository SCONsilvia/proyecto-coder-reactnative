import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../constants/theme";

const MainLayout = ({ children, top = false }) => {
    const { colors } = useTheme();

    const edges = top
        ? ['left', 'right', 'bottom', 'top']
        : ['left', 'right', 'bottom'];

    return (
        <SafeAreaView
            style = {{ flex: 1, backgroundColor: colors.background }}
            edges = {edges}
        >
            {children}
        </SafeAreaView>
    );
};

export default MainLayout;
