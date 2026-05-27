import { useSelector } from "react-redux";
import { lightColors, darkColors } from "./colors";

export const useTheme = () => {
    const isDark = useSelector((state) => state.theme.isDark);

    //Devuelve los colores del tema activo y si está en modo oscuro
    return {
        colors: isDark ? darkColors : lightColors,
        isDark,
    };
};
