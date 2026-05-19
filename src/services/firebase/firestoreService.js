import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseApp";

export const uploadMetadata = async (drawing) => {
console.log("subiendo a firebase", drawing);

    //setDoc(ref, data), crea documento si NO existe, Remplaza documento si Ya existe
    await setDoc(
        //Base de datos, colección drawings, documento drawing.id
        doc(db, "drawings", drawing.id),
        {
        ...drawing,
        updatedAt: new Date().toISOString(),
        }
    );
    console.log("ya subido a firebase", drawing);
};
