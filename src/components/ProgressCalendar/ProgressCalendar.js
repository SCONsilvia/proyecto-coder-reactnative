import { Calendar } from "react-native-calendars";
import { useDrawingCalendar } from "../../hooks/useDrawingCalendar";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

const ProgressCalendar = () => {

    const { loading, getDrawingCalendarFormat} = useDrawingCalendar();
    const [data, setData] = useState({});

    useEffect(() => {
        const loadCalendar = async () => {
            const result = await getDrawingCalendarFormat();
            setData(result)
        }
        loadCalendar();
    },[])

    if(loading){
        return <ActivityIndicator/>;
    }
    
    
    return(
        <Calendar markedDates = {data}/>
    )
}

export default ProgressCalendar;
