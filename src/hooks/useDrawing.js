import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDrawing } from "../services/database/drawingService";

export const useDrawing = (id) => {

    const uid = useSelector(state => state.user.uid);
    //para arreglar error de que si se modifica algo no se estaba actualizando visualmente en la pantalla 
    //como useDrawing solo está montado en ImageDetailScreen — la pantalla de detalle de un solo item. Cuando version sube, ese hook recorre UNA sola query ELECT * FROM drawings WHERE id = ? AND userId = ?
    //Hasta este momento eso es trivial y en la app, solo hay un ImageDetailScreen montada a la vez y como La galería usa useGalleryDrawings (un hook diferente), que ya depende de version desde antes y ya recarga toda la lista cuando version cambia.
    //Por ahora no hay problema pero
    //Si en algún momento hicieramos que cada item de la galería usara useDrawing(id) individualmente, sí tendriamos un problema: al cambiar version, todos y cada uno harían su propia query a SQLite al mismo tiempo.
    //Ese es un problema real en apps con listas grandes. La solución en ese caso sería no usar version global sino pasar el item como prop desde la lista padre, y solo recargar desde la DB al nivel de useGalleryDrawings. El detalle recibe el dato via prop, no hace su propia query.
    const version = useSelector(state => state.drawings.version); 

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
    }, [id, uid, version]);

    return { item, loading };
};

