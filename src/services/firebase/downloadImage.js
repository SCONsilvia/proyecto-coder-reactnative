import * as FileSystem from "expo-file-system/legacy";
import { saveImage } from "../storage/imageStorage";

export const downloadImage = async (remoteUrl, uid, id) => {
    if (!remoteUrl) return null;

    console.log("⬇️ DOWNLOADING IMAGE");

    try {
        // 1 archivo temporal
        const ext = remoteUrl.split("?")[0].split(".").pop();
        const tempPath = FileSystem.cacheDirectory + `temp_${id}.${ext}`;
        
        // 2 descargar desde internet
        const result = await FileSystem.downloadAsync(
            remoteUrl,
            tempPath
        );

        // 3 mover a storage oficial
        const localUri = await saveImage(
            result.uri,
            uid,
            id
        );

        // 4 limpiar temporal
        await FileSystem.deleteAsync(result.uri, {
            idempotent: true,
        });

        return localUri;

    } catch (error) {
        console.error("Download image failed", error);
        throw error;
    }
};