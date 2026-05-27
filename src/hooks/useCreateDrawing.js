
import { createDrawingWithImage } from "../services/database/drawingService";
import { useDispatch, useSelector } from "react-redux";
import { drawingChanged } from "../features/drawings/drawingsSlice";
import { useState } from "react";
import { openGallery } from "../services/media/mediaSevirce";

export const useCreateDrawing = () => {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.user.uid);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 

    const createDrawing = async (data, asset) => {
        try {
            setLoading(true);
            setError(null); 

            const result = await createDrawingWithImage(data, asset, uid);

            dispatch(drawingChanged());

            return result;

        } catch (err) {
            setError(err.message ?? "Error al crear el dibujo");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        createDrawing,
    };
};

