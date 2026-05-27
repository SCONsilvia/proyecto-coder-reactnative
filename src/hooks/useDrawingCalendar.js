
import { getDrawingDays } from "../services/database/drawingRepository";
import { useSelector } from "react-redux";
import { useState } from "react";

export const useDrawingCalendar = () => {
    const uid = useSelector(state => state.user.uid);

    const [loading, setLoading] = useState(false);

    const fetchDrawingCalendar = async () => {
        return await getDrawingDays(uid);
    };

    /*Formato deseado
        {
            "2026-05-20": {
                marked: true,
                dotColor: "green"
            },

            "2026-05-21": {
                selected: true,
                dotColor: "blue"
            }
        }
    */
    const getDrawingCalendarFormat = async () => {
        try {
            setLoading(true);

            const rows = await fetchDrawingCalendar();

            const markedDates = {};

            rows && rows.forEach((row) => {
                markedDates[row.drawingDay] = {
                    selected: true,
                    selectedColor: "green",
                };
            });

            return markedDates;

        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        getDrawingCalendarFormat,
    };
};

