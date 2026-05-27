import { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { Text } from "react-native";
import { useDrawingsByDate } from "../hooks/useDrawingsByDate";
import Galeria from "../components/Galeria/Galeria";
import { useTheme } from "../constants/theme";

const GalleryDayScreen = ({navigation, route}) => {
    const { colors } = useTheme();
    
    const { date } = route.params;

    const { items, loading, refresh, refreshing, error } = useDrawingsByDate(date);
    
    return(
        <MainLayout>
            <Text>GalleryDayScreen{date}</Text>

            {error && (
                <Text style={{ color: colors.error, padding: 16 }}>
                    {error}
                </Text>
            )}
            <Galeria items = {items} loading = {loading} onRefresh = {refresh} refreshing = {refreshing} />
        </MainLayout>
    )
}

export default GalleryDayScreen;
