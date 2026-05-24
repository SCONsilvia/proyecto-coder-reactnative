import { doc, setDoc, deleteDoc, getDoc, serverTimestamp } from "firebase/firestore";
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
        basedOnVersion,
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
    const ref = doc(db, "drawings", drawing.id);

    await setDoc(ref,
        { ...sanitizeDrawing(drawing), updatedAtServer: serverTimestamp()}
    );

    // Volvemos a leer el dato para ver que fecha guardo
   const updatedSnap = await getDoc(ref);

   return updatedSnap.data();
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
    //Si remote.syncVersion === local.syncVersion - 1 entonces no hay conflictos y se sube el local, pero si es distinto entonces hay un conflico y hay que ver quien tiene el cambio mas reciente
    if (remote.syncVersion !== drawing.basedOnVersion) {
        console.log("CONFLICCTOOTOOTOTOTOO");
        const result = await resolveConflict(drawing, remote)
        if (result === "REMOTE_WINS") {
            return remote; // 🔥 PARAR ACA
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



