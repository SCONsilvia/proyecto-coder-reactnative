import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseApp";

//esto deberia de estar en otro sitio
import { resolveConflict } from "../../core/sync/conflictResolver";

//funcion para limpoar datos
const sanitizeDrawing = (drawing) => {
    const {
        status,
        pendingAction,
        localUri,
        lastError,
        ...firestoreData
    } = drawing;

    return {
        ...firestoreData,

        // 🔥 asegurar booleano
        isArchived: Boolean(drawing.isArchived),
        
    };
};

export const createMetadata = async (drawing) => {
    console.log("CREATE metadata", drawing.id);

    await setDoc(
        doc(db, "drawings", drawing.id),
        sanitizeDrawing(drawing)
    );
};

export const updateMetadata = async (drawing) => {
    console.log("UPDATE metadata", drawing.id);

    const ref = doc(db, "drawings", drawing.id);

    //antes de subir el cambio vamos a ver si 1 exite el archivo y 2 dectetar que se pueda hacer el cambio
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        throw new Error("Remote drawing missing");
    }

    const remote = snap.data();

    // 🔥 CHECK VERSION
    console.log("conflictosssssssssssss", drawing, remote);
    if (remote.syncVersion !== drawing.syncVersion - 1) {
        console.log("CONFLICCTOOTOOTOTOTOO");
        await resolveConflict(drawing, remote)
        if (result === "REMOTE_WINS") {
            return; // 🔥 PARAR ACA
        }
        //throw new Error("VERSION_CONFLICT");

    }

    const drawingSanitize = sanitizeDrawing(drawing);

    await setDoc(ref, {
        ...drawingSanitize,
        syncVersion: drawing.syncVersion,
    }, { merge: true });//evita sobrescribir todo


};

export const deleteMetadata = async (drawingId) => {
    console.log("DELETE drawing", drawingId);

    await deleteDoc(
        doc(db, "drawings", drawingId)
    );
};

