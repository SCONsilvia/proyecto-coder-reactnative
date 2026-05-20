import { upsertRemoteDrawing } from "../../services/database/drawingRepository";
import { requestSync } from "./syncTrigger";

export const resolveConflict = async (localDrawing, remote) => {

    console.log("⚠️ CONFLICT DETECTED");

    console.log("LOCAL     ",localDrawing,"REMOTO    ", remote);
    
    // estrategia simple profesional:
    // LAST EDIT WINS usando updatedAt

    if (localDrawing.updatedAt > remote.updatedAt) {

        console.log("LOCAL WINS");

        // pisamos remoto después
        requestSync();

        return "LOCAL_WINS";

    } else {

        console.log("REMOTE WINS");

        await upsertRemoteDrawing(remote);

        return "REMOTE_WINS";
    }
};