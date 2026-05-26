
import { getDrawingsByDate } from "../services/database/drawingRepository";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export const useDrawingsByDate = (date) => {
    const uid = useSelector(state => state.user.uid);
    const version = useSelector(state => state.drawings.version);

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    // Solo resetea cuando cambia el usuario (login/logout)
    useEffect(() => {
        setItems([]);
        setLoading(true);
    }, [uid, date]);

    // Refresca silenciosamente en cada cambio de datos
    useEffect(() => {
        if (!uid) return;

        const load = async () => {
            try {
                setLoading(true);

                const resp = await getDrawingsByDate(uid, date);
                setItems(resp);

            } catch (err) {
                console.log(err);

            } finally {
                setLoading(false);
            }
        };

        load();

    }, [uid, version, date]);
    
    return {
        loading,
        items,
    };
};

