
import { createDrawingWithImage } from "../services/database/drawingService";
import { useDispatch, useSelector } from "react-redux";
import { drawingChanged } from "../features/drawings/drawingsSlice";
import { useState } from "react";
import { openGallery } from "../services/media/mediaSevirce";

export const useCreateDrawing = () => {
    const dispatch = useDispatch();
    const uid = useSelector(state => state.user.uid);

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const createFromGallery = async () => {
        try {
            setLoading(true);

            const asset = await openGallery();
            if (!asset) return;

            const data = {
                description: "hola a todos",
            };

            const result = await createDrawingWithImage(data, asset, uid);

            dispatch(drawingChanged());

            setImage(result.savedUri);

            return result;

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        image,
        loading,
        createFromGallery,
    };
};

