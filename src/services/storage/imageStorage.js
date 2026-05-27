import * as FileSystem from "expo-file-system/legacy";

//Directorio base por usuario
const getUserDir = (userId) => {
    return FileSystem.documentDirectory + `drawings/${userId}/`;
};

//obtener extension
const getExtension = (uri) => {
    const cleanUri = uri.split("?")[0];
    return cleanUri.substring(cleanUri.lastIndexOf(".") + 1);
};

//Crea el directorio del usuario si no existe
export const ensureUserDir = async (userId) => {
    const userDir = getUserDir(userId);

    const dir = await FileSystem.getInfoAsync(userDir);

    if (!dir.exists) {
        await FileSystem.makeDirectoryAsync(userDir, {
            intermediates: true,
        });
    }

    return userDir;
};

//salva imagen en el directorio correspondiente
export const saveImage = async (uri, userId, id) => {
    try {
        const extension = getExtension(uri);
        const fileName = `${id}.${extension}`;

        const userDir = await ensureUserDir(userId);

        const newPath = userDir + fileName;

        await FileSystem.copyAsync({
            from: uri,
            to: newPath,
        });
        
        return newPath;
    } catch (error) {
        console.error("Error guardando imagen", error);
        throw error;
    }
};

// borrar imagen del filesystem
export const deleteImage = async (uri) => {
    try {
        if (!uri) return;

        const file = await FileSystem.getInfoAsync(uri);

        // evitar error si no existe
        if (!file.exists) {
            //La imagen ya no existe
            return;
        }

        await FileSystem.deleteAsync(uri, {
            idempotent: true, // no falla si ya fue borrada
        });

    } catch (error) {
        console.error("Error eliminando imagen", error);
        throw error;
    }
};
