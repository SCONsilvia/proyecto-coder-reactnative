import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserDrawings } from "../services/database/drawingService";
import { getArchivedDrawings } from "../services/database/drawingRepository";

export const useGalleryDrawings = (mode = "active") => {

    const uid = useSelector(state => state.user.uid);
    const version = useSelector(state => state.drawings.version);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return {
        items,
        loading,
    };
};