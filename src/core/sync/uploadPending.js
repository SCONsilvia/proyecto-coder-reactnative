import { getPendingActions } from "../../services/database/drawingRepository";
import { markAsSyncing, markAsFailed, markAsSynced } from "../../services/database/drawingRepository";
import { uploadImage } from "../../services/firebase/storageService";
import {
    createMetadata,
    updateMetadata
} from "../../services/firebase/firestoreService";
import { recoverInterruptedSync } from "../../services/database/drawingRepository";

export const uploadPendingActions = async (userId) => {
    console.log("trayendo getPeding");
    await recoverInterruptedSync();

    const drawings = await getPendingActions(userId);

    for (const drawing of drawings) {

        try {
            //marcando como sicronizando
            await markAsSyncing(drawing.id);

            switch (drawing.pendingAction) {

                case "create": {
                    if (!drawing.localUri) {
                        await markAsFailed(drawing.id, new Error("localUri missing"));
                        break;
                    }

                    // 1 convertir archivo local a blob
                    const response = await fetch(drawing.localUri);

                    if (!response.ok) {
                        await markAsFailed(drawing.id, new Error("Missing localUri"));
                        break;
                    }

                    const blob = await response.blob();

                    console.log("subiendo imagen");
                    //sacamo la extension del archivo 
                    const cleanUri = drawing.localUri.split("?")[0];
                    const extension = cleanUri.substring(cleanUri.lastIndexOf(".") + 1);
                    // 2 subir imagen
                    const remoteUrl = await uploadImage(
                        drawing.userId,
                        drawing.id,
                        extension,
                        blob
                    );

                    console.log("subiendo metadata");
                    // 3 subir metadata
                    const data = await createMetadata({
                        ...drawing,
                        remoteUrl
                    });

                    // 4 liberamos el blob
                    blob.close?.();

                    console.log("subiendo actualizacion de syn a sqlite");

                    console.log("DATA", data);
                    // 5 marcar synced local
                    await markAsSynced(drawing.id, data, remoteUrl);
                    break;
                }

                case "update": {
                    const data = await updateMetadata(drawing);
                    console.log("DATA", data);
                    
                    await markAsSynced(drawing.id, data);
                    break;
                }

                default:
                    console.log("Unknown action", drawing.pendingAction);
            }

        } catch (e) {
            await markAsFailed(drawing.id, e);
        }
    }
};
