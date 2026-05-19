import {
    Text,
    ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDrawing } from "../../services/database/drawingService";
import ItemDetail from "../ItemDetail/ItemDetail";


const ItemDetailContainer = ({ id }) => {

    const uid = useSelector(state => state.user.uid);

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDrawing = async () => {
            setLoading(true);

            const resp = await getDrawing(id, uid);
            setItem(resp);

            setLoading(false);
        };

        loadDrawing();
    }, [id, uid]);

    if (loading) {
        return (
            <ActivityIndicator size="large" />
        );
    }

    if (!item) {
        return (
            <Text>No se encontró la imagen</Text>
        );
    }

    return (
        <ItemDetail item = {item}/>
    );
};

export default ItemDetailContainer;
