
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
    const [error, setError] = useState(null);

    //Resetea el estado cuando cambia el usuario o la fecha seleccionada
    useEffect(() => {
        setItems([]);
        setLoading(true);
        setError(null); 
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
                setError(err.message ?? "Error al cargar los dibujos"); 

            } finally {
                setLoading(false);
            }
        };

        load();

    }, [uid, version, date]);

    const refresh = useCallback(async () => {
        if (!uid) return;

        setRefreshing(true);
        setError(null);

        try {
            await runSync(uid, () => dispatch(drawingChanged()));
            const resp = await getDrawingsByDate(uid, date);
            setItems(resp);
        } catch (err) {
            setError(err.message ?? "Error al sincronizar");
        } finally {
            setRefreshing(false);
        }
    }, [uid, date, dispatch]);
    
    return {
        loading,
        items,
        refresh, 
        refreshing,
        error
    };
};

