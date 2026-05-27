import { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { Text } from "react-native";
import { useDrawingsByDate } from "../hooks/useDrawingsByDate";
import Galeria from "../components/Galeria/Galeria";


const GalleryDayScreen = ({navigation, route}) => {
    const { date } = route.params;

    const { items, loading, refresh, refreshing } = useDrawingsByDate(date);
    
    return(
        <MainLayout>
            <Text>GalleryDayScreen{date}</Text>
            <Galeria items = {items} loading = {loading} onRefresh = {refresh} refreshing = {refreshing} />
        </MainLayout>
    )
}

export default GalleryDayScreen;
