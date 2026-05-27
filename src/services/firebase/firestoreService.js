import { doc, setDoc, deleteDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseApp";

import { resolveConflict } from "../../core/sync/conflictResolver";

//Elimina campos internos antes de subir a Firestore
const sanitizeDrawing = (drawing) => {
    const {
        status,
        pendingAction,
        localUri,
        lastError,
        basedOnVersion,
        updatedAtServer,
        ...firestoreData
    } = drawing;

    return {
        ...firestoreData,

        //asegurar booleano
        isArchived: Boolean(drawing.isArchived),
        
    };
};

export const createMetadata = async (drawing) => {
    const ref = doc(db, "drawings", drawing.id);

    await setDoc(ref,
        { ...sanitizeDrawing(drawing), updatedAtServer: serverTimestamp()}
    );

    // Volvemos a leer el dato para ver que fecha guardo
   const updatedSnap = await getDoc(ref);

   return updatedSnap.data();
};

export const updateMetadata = async (drawing) => {

    const ref = doc(db, "drawings", drawing.id);

    //Verificamos que el documento exista en Firestore antes de intentar actualizarlo
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        throw new Error("Remote drawing missing");
    }

    const remote = snap.data();

    //CHECK VERSION
    // Sin conflicto: el remoto tiene la versión que usamos como base al editar
    // Con conflicto: alguien más modificó el remoto mientras estábamos offline
    if (remote.syncVersion !== drawing.basedOnVersion) {
        const result = await resolveConflict(drawing, remote)
        if (result === "REMOTE_WINS") {
            return remote; //PARAR ACA
        }
        //throw new Error("VERSION_CONFLICT");

    }

    const drawingSanitize = sanitizeDrawing(drawing);

    //subimos cambios locales al firebase de una
    await setDoc(ref, {
        ...drawingSanitize,
        syncVersion: drawing.syncVersion,
        updatedAtServer: serverTimestamp(),
    }, { merge: true });//evita sobrescribir todo

    // Volvemos a leer el dato para ver que fecha guardo
   const updatedSnap = await getDoc(ref);

   return updatedSnap.data();
};



