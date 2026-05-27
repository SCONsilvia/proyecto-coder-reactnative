import {
    collection,
    query,
    where,
    getDocs,
    Timestamp
} from "firebase/firestore";

import { db } from "../../services/firebase/firebaseApp";
import { getMetadata, setMetadata } from "../../services/database/syncRepository";
import { upsertRemoteDrawing, getDrawingById } from "../../services/database/drawingRepository";

import { downloadImage } from "../../services/firebase/downloadImage";

export const downloadRemoteChanges = async (uid) => {

    console.log("⬇️ DOWNLOADING REMOTE");

    const lastSyncAt = await getMetadata("lastSyncAt");

    let q;

    if (lastSyncAt) {
        q = query(
            collection(db, "drawings"),
            where("userId", "==", uid),
            where("updatedAtServer", ">", Timestamp.fromMillis(lastSyncAt))
        );
    } else {
        // primer login
        q = query(
            collection(db, "drawings"),
            where("userId", "==", uid)
        );
    }

    const snapshot = await getDocs(q);

    let newestDate = lastSyncAt;

    for (const docSnap of snapshot.docs) {

        const remoteDrawing = docSnap.data();

        //Buscamos el registro local para comparar fechas y evitar descargas innecesarias
        const localDrawing = await getDrawingById(remoteDrawing.id, remoteDrawing.userId);
        //Si ya estaba sincronizados no hacemos nada
        //Convertimos updatedAtServer a milisegundos para comparar con el valor local
        const remoteMs = remoteDrawing.updatedAtServer?.toMillis?.() ?? 0;
        if (localDrawing && remoteMs === localDrawing.updatedAtServer) {
            continue;
        }

        const localUri = await downloadImage(
            remoteDrawing.remoteUrl,
            uid,
            remoteDrawing.id
        );

        await upsertRemoteDrawing({...remoteDrawing, localUri});

        if (!newestDate || remoteMs > newestDate) {
            newestDate = remoteMs;
        }
    }

    if (newestDate) {
        await setMetadata("lastSyncAt", newestDate);
    }

    console.log("✅ DOWNLOAD COMPLETE");
};