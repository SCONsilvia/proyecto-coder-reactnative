
import { createDrawingWithImage } from "../services/database/drawingService";
import { useDispatch, useSelector } from "react-redux";
import { drawingChanged } from "../features/drawings/drawingsSlice";
import { useState } from "react";
import { openGallery } from "../services/media/mediaSevirce";

export const useCreateDrawing = () => {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.user.uid);

    const [loading, setLoading] = useState(false);

    const createDrawing = async (data, asset) => {
        try {
            setLoading(true);

            const result = await createDrawingWithImage(data, asset, uid);

            dispatch(drawingChanged());

            return result;

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        createDrawing,
    };
};

