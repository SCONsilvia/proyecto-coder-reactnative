import { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { Text } from "react-native";
import { useDrawingsByDate } from "../hooks/useDrawingsByDate";
import Galeria from "../components/Galeria/Galeria";


const GalleryDayScreen = ({navigation, route}) => {
    const { date } = route.params;

    const { items, loading, numColumns } = useDrawingsByDate(date);
    
    return(
        <MainLayout>
            <Text>GalleryDayScreen{date}</Text>
            <Galeria items = {items} loading = {loading} numColumns = {numColumns}/>
        </MainLayout>
    )
}

export default GalleryDayScreen;
