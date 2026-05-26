import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserDrawings } from "../services/database/drawingService";

export const useGalleryDrawings = () => {

    const uid = useSelector(state => state.user.uid);
    const version = useSelector(state => state.drawings.version);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

 // Solo resetea cuando cambia el usuario (login/logout)
    useEffect(() => {
        setItems([]);
        setLoading(true);
    }, [uid]);

    // Refresca silenciosamente en cada cambio de datos
    useEffect(() => {
        if (!uid) return;

        const load = async () => {
            const resp = await getUserDrawings(uid);
            setItems(resp);
            setLoading(false);
        };

        load();
    }, [uid, version]);

    return {
        items,
        loading,
    };
};
