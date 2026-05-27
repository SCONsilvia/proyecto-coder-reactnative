import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDrawing } from "../services/database/drawingService";
import { runSync } from "../core/sync/syncEngine";
import { drawingChanged } from "../features/drawings/drawingsSlice";

export const useDrawing = (id) => {

    const uid = useSelector(state => state.user.uid);
    //para arreglar error de que si se modifica algo no se estaba actualizando visualmente en la pantalla 
    //como useDrawing solo está montado en ImageDetailScreen — la pantalla de detalle de un solo item. Cuando version sube, ese hook recorre UNA sola query ELECT * FROM drawings WHERE id = ? AND userId = ?
    //Hasta este momento eso es trivial y en la app, solo hay un ImageDetailScreen montada a la vez y como La galería usa useGalleryDrawings (un hook diferente), que ya depende de version desde antes y ya recarga toda la lista cuando version cambia.
    //Por ahora no hay problema pero
    //Si en algún momento hicieramos que cada item de la galería usara useDrawing(id) individualmente, sí tendriamos un problema: al cambiar version, todos y cada uno harían su propia query a SQLite al mismo tiempo.
    //Ese es un problema real en apps con listas grandes. La solución en ese caso sería no usar version global sino pasar el item como prop desde la lista padre, y solo recargar desde la DB al nivel de useGalleryDrawings. El detalle recibe el dato via prop, no hace su propia query.
    const version = useSelector(state => state.drawings.version); 
    const dispatch = useDispatch();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Solo resetea a "loading" cuando navegás a un item diferente
    useEffect(() => {
        setItem(null);
        setLoading(true);
    }, [id]);

    // Recarga los datos sin mostrar spinner en refreshes
    useEffect(() => {
        if (!uid) return;

        const load = async () => {
            const resp = await getDrawing(id, uid);
            setItem(resp);
            setLoading(false);
        };

        load();
    }, [id, uid, version]);

    const refresh = useCallback(async () => {
        if (!uid) return;

        setRefreshing(true);
        
        await runSync(uid, () => dispatch(drawingChanged()));

        const resp = await getDrawing(id, uid);

        setItem(resp);
        setRefreshing(false);
    }, [id, uid, dispatch]);

    return { item, loading, refresh, refreshing };
};

