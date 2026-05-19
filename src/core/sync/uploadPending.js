import { getPendingDrawings } from "../../services/database/drawingRepository";
import { markAsSyncing } from "../../services/database/drawingRepository";
import { markAsFailed } from "../../services/database/drawingRepository";
import { uploadImage } from "../../services/firebase/storageService";
import { uploadMetadata } from "../../services/firebase/firestoreService";
import { markAsSynced } from "../../services/database/drawingRepository";
import { recoverInterruptedSync } from "../../services/database/drawingRepository";

export const uploadPendingDrawings = async (userId) => {
console.log("trayendo getPeding");

    await recoverInterruptedSync();
    const drawings = await getPendingDrawings(userId);

    for (const drawing of drawings) {

        try {
            //marcando como sicronizando
            await markAsSyncing(drawing.id)
console.log("convirtiendo archivo en blob");

            // 1 convertir archivo local a blob
            if (!drawing.localUri) {
                await markAsFailed(
                    drawing.id,
                    new Error("localUri missing")
                );
                continue;
            }
            const response = await fetch(drawing.localUri);//esta linea esta leyendo la iamgen localmente 
            if (!response.ok) {
                await markAsFailed(drawing.id, new Error("Missing localUri"));
                continue;
            }
            const blob = await response.blob();//el archivo lo convertimos a un blob
console.log("subiendo imagen");

            // 2 subir imagen
            const remoteUrl = await uploadImage(
                drawing.userId,
                drawing.id,
                blob
            );
console.log("subiendo metadata");

            // 3 subir metadata
            await uploadMetadata({
                ...drawing,
                remoteUrl
            });
console.log("subiendo actualizacion de syn a sqlite");

            // 4 marcar synced local
            await markAsSynced(drawing.id, remoteUrl);

            //5 liberamos el blob
            blob.close?.();

        } catch (e) {
            console.log("Sync error", e);

            await markAsFailed(drawing.id, e instanceof Error ? e : new Error(String(e)));

            if(e.code === "storage/unauthorized"){
                console.log("Inautorizado");
            }

            if(e.code === "storage/retry-limit-exceeded"){
                console.log("limite alcanzado");
            }
        }
    }
};
