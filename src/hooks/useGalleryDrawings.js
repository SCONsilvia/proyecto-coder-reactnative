import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { getUserDrawings } from "../services/database/drawingService";
import { getArchivedDrawings } from "../services/database/drawingRepository";
import { runSync } from "../core/sync/syncEngine";
import { drawingChanged } from "../features/drawings/drawingsSlice";

export const useGalleryDrawings = (mode = "active") => {

    const uid = useSelector(state => state.user.uid);
    const version = useSelector(state => state.drawings.version);
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Reset solo cuando cambia usuario
    useEffect(() => {
        setItems([]);
        setLoading(true);
    }, [uid]);

    useEffect(() => {
        if (!uid) return;

        const load = async () => {

            setLoading(true);

            let resp = [];

            if (mode === "archived") {
                resp = await getArchivedDrawings(uid);
            } else {
                resp = await getUserDrawings(uid);
            }
            setItems(resp);
            setLoading(false);
        };

        load();

    }, [uid, version, mode]);

    const refresh = useCallback(async () => {
        if (!uid) return;

        setRefreshing(true);

        await runSync(uid, () => dispatch(drawingChanged()));

        const resp = mode === "archived"
            ? await getArchivedDrawings(uid)
            : await getUserDrawings(uid);
            
        setItems(resp);
        setRefreshing(false);
    }, [uid, mode, dispatch]);

    return {
        items,
        loading,
        refresh, 
        refreshing 
    };
};