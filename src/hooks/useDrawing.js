import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDrawing } from "../services/database/drawingService";

export const useDrawing = (id) => {

    const uid = useSelector(state => state.user.uid);

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const resp = await getDrawing(id, uid);
            setItem(resp);
            setLoading(false);
        };

        load();
    }, [id, uid]);

    return { item, loading };
};

