import { upsertRemoteDrawing, markPendingUpdate, markAsSynced } from "../../services/database/drawingRepository";
import { requestSync } from "./syncTrigger";

export const resolveConflict = async (localDrawing, remote) => {

    console.log("⚠️ CONFLICT DETECTED");
    
    // estrategia simple profesional:
    // LAST EDIT WINS usando updatedAt
    const localTime = localDrawing.updatedAtServer ?? localDrawing.updatedAtClient ?? 0;//aca en la db ya el dato se guardo como toMillis

    const remoteTime = remote.updatedAtServer?.toMillis?.() ?? remote.updatedAtClient ?? 0;
    if (localTime > remoteTime) {

        console.log("LOCAL WINS");

        return "LOCAL_WINS";

    } else {

        console.log("REMOTE WINS");

        // pisamos local y de una se marca sincronizado
        await upsertRemoteDrawing(remote);

        return "REMOTE_WINS";
    }
};