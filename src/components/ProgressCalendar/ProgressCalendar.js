import { Calendar } from "react-native-calendars";
import { useDrawingCalendar } from "../../hooks/useDrawingCalendar";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

const ProgressCalendar = () => {
    const navigation = useNavigation();

    const { loading, getDrawingCalendarFormat} = useDrawingCalendar();
    const [data, setData] = useState({});

    useEffect(() => {
        const loadCalendar = async () => {
            const result = await getDrawingCalendarFormat();
            setData(result)
        }
        loadCalendar();
    },[])

    const handleDayPress = (day) => {
        navigation.navigate("GalleryDayScreen", { date: day.dateString, });
    }

    if(loading){
        return <ActivityIndicator/>;
    }
    
    
    return(
        <Calendar markedDates = {data} onDayPress={(day) => { handleDayPress(day) }}/>
    )
}

export default ProgressCalendar;
