import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseApp";

export const uploadImage = async (userId, drawingId, extension, blob) => {
console.log("uploadImage");

    //apuntamos a un archivo en la nube
    const storageRef = ref(
        storage,
        `drawings/${userId}/${drawingId}.${extension}`
    );

    //subimos datos uploadBytes (donde_guardar, datos_binarios)
    await uploadBytes(storageRef, blob);
console.log("retornando url");

    //obtenemos link publico
    return await getDownloadURL(storageRef);
};
