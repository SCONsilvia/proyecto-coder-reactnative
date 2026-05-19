import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseApp";

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
        
        updatedAt: new Date().toISOString(),
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

    await setDoc(
        doc(db, "drawings", drawing.id),
        sanitizeDrawing(drawing),
        { merge: true }//evita sobrescribir todo
    );
};

export const deleteMetadata = async (drawingId) => {
    console.log("DELETE drawing", drawingId);

    await deleteDoc(
        doc(db, "drawings", drawingId)
    );
};

