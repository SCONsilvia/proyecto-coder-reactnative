import { ActivityIndicator } from "react-native";
import { Calendar } from "react-native-calendars";
import { useDrawingCalendar } from "../../hooks/useDrawingCalendar";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../constants/theme";

const ProgressCalendar = ({ refreshKey = 0 }) => {
    const navigation = useNavigation();

    const { loading, getDrawingCalendarFormat } = useDrawingCalendar();
    const [data, setData] = useState({});

    const { colors, isDark } = useTheme();

    useEffect(() => {
        const loadCalendar = async () => {
            const result = await getDrawingCalendarFormat();
            setData(result);
        };
        loadCalendar();
    }, [refreshKey]);

    const handleDayPress = (day) => {
        navigation.navigate("GalleryDayScreen", { date: day.dateString });
    };

    if (loading) return <ActivityIndicator color = {colors.primary} />;

    return (
        <Calendar

            key = {isDark ? "dark" : "light"}//fuerza re-render del calendario al cambiar el tema
            markedDates = {data}
            onDayPress = {handleDayPress}
            theme = {{
                backgroundColor: colors.surface,
                calendarBackground: colors.surface,
                textSectionTitleColor: colors.muted,
                selectedDayBackgroundColor: colors.primary,
                selectedDayTextColor: "#FFFFFF",
                todayTextColor: colors.primary,
                todayBackgroundColor: colors.surfaceVariant,
                dayTextColor: colors.textPrimary,
                textDisabledColor: colors.border,
                dotColor: colors.primary,
                selectedDotColor: "#FFFFFF",
                monthTextColor: colors.textPrimary,
                arrowColor: colors.primary,
                textDayFontWeight: "500",
                textMonthFontWeight: "700",
                textDayHeaderFontWeight: "600",
            }}
            style = {{ borderRadius: 12 }}
        />
    );
};

export default ProgressCalendar;
