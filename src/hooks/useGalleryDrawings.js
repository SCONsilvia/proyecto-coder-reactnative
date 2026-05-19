import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { getUserDrawings } from "../services/database/drawingService";

export const useGalleryDrawings = () => {

    const uid = useSelector(state => state.user.uid);
    const version = useSelector(state => state.drawings.version);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { width } = useWindowDimensions();

    const ITEM_SIZE = 180;
    const numColumns = Math.min(
        5,
        Math.max(2, Math.floor(width / ITEM_SIZE))
    );

    useEffect(() => {

        const loadDrawings = async () => {
            setLoading(true);

            const resp = await getUserDrawings(uid);
            setItems(resp);

            setLoading(false);
        };

        loadDrawings();

    }, [uid, version]);

    return {
        items,
        loading,
        numColumns,
    };
};
