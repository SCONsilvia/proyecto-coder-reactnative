import * as FileSystem from "expo-file-system/legacy";
import { nanoid } from "nanoid";

//directiorio por usuario
const getUserDir = (userId) => {
    return FileSystem.documentDirectory + `drawings/${userId}/`;
};

//obtener extension
const getExtension = (uri) => {
    const cleanUri = uri.split("?")[0];
    return cleanUri.substring(cleanUri.lastIndexOf(".") + 1);
};

//crear directorio de usuairo si no existe
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
export const saveImage = async (uri, userId) => {
    try {
        const extension = getExtension(uri);
        const fileName = `${nanoid()}.${extension}`;

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