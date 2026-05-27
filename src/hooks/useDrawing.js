import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDrawing } from "../services/database/drawingService";
import { runSync } from "../core/sync/syncEngine";
import { drawingChanged } from "../features/drawings/drawingsSlice";

export const useDrawing = (id) => {

    const uid = useSelector(state => state.user.uid);
    //Escucha cambios globales de dibujos para refrescar el detalle cuando se edita o sincroniza
    const version = useSelector(state => state.drawings.version); 
    const dispatch = useDispatch();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    // Solo resetea a "loading" cuando navegás a un item diferente
    useEffect(() => {
        setItem(null);
        setLoading(true);
        setError(null);
    }, [id]);

    // Recarga los datos sin mostrar spinner en refreshes
    useEffect(() => {
        if (!uid) return;

        const load = async () => {
            try {
                const resp = await getDrawing(id, uid);
                setItem(resp);
            } catch (err) {
                setError(err.message ?? "Error al cargar el dibujo");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [id, uid, version]);

    const refresh = useCallback(async () => {
        if (!uid) return;

        setRefreshing(true);
        setError(null);
        
        try {
            await runSync(uid, () => dispatch(drawingChanged()));
            const resp = await getDrawing(id, uid);
            setItem(resp);
        } catch (err) {
            setError(err.message ?? "Error al sincronizar");
        } finally {
            setRefreshing(false);
        }
    }, [id, uid, dispatch]);

    return { item, loading, refresh, refreshing, error };
};

