
import { getDrawingsByDate } from "../services/database/drawingRepository";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { runSync } from "../core/sync/syncEngine";
import { drawingChanged } from "../features/drawings/drawingsSlice";

export const useDrawingsByDate = (date) => {
    const uid = useSelector(state => state.user.uid);
    const version = useSelector(state => state.drawings.version);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

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

    const refresh = useCallback(async () => {
        if (!uid) return;

        setRefreshing(true);

        await runSync(uid, () => dispatch(drawingChanged()));

        const resp = await getDrawingsByDate(uid, date);

        setItems(resp);
        setRefreshing(false);
    }, [uid, date, dispatch]);
    
    return {
        loading,
        items,
        refresh, 
        refreshing
    };
};

