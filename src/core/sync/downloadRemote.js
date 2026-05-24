import {
    collection,
    query,
    where,
    getDocs,
    Timestamp
} from "firebase/firestore";

import { db } from "../../services/firebase/firebaseApp";
import { getMetadata, setMetadata } from "../../services/database/syncRepository";
import { upsertRemoteDrawing } from "../../services/database/drawingRepository";

import { downloadImage } from "../../services/firebase/downloadImage";

export const downloadRemoteChanges = async (uid) => {

    console.log("⬇️ DOWNLOADING REMOTE");

    const lastSyncAt = await getMetadata("lastSyncAt");

    let q;

    if (lastSyncAt) {
        q = query(
            collection(db, "drawings"),
            where("userId", "==", uid),
            where("updatedAtServer", ">", Timestamp.fromMillis(Number(lastSyncAt)))
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

        const localUri = await downloadImage(
            remoteDrawing.remoteUrl,
            uid,
            remoteDrawing.id
        );

        console.log("mmm",localUri);
        

        await upsertRemoteDrawing({...remoteDrawing, localUri});

        //trnaformamos los datos (convierte a milisegundos, que es serializable):
        const candidateDate = remoteDrawing.updatedAtServer?.toMillis?.() ?? 0;

        if (
            !newestDate ||
            candidateDate > newestDate
        ) {
            newestDate = candidateDate;
        }
    }

    if (newestDate) {
        await setMetadata("lastSyncAt", newestDate);
    }

    console.log("✅ DOWNLOAD COMPLETE");
};