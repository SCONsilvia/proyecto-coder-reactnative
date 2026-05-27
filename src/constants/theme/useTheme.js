import { useSelector } from "react-redux";
import { lightColors, darkColors } from "./colors";

export const useTheme = () => {
    const isDark = useSelector((state) => state.theme.isDark);

    return {
        colors: isDark ? darkColors : lightColors,
        isDark,
    };
};
