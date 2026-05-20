import { uploadPendingActions } from "./uploadPending";
import { downloadRemoteChanges } from "./downloadRemote";

//para que no hay nunca 2 sync simultaneos
let syncing = false;
let pendingRun = false;

//onDownloadComplete va a ser para mandar mensaje de que ocurrieron cambios
export async function runSync(uid, onDownloadComplete) {

    // 🚫 ya hay sync corriendo
    if (syncing) {
        console.log("⏳ Sync already running → queued");
        pendingRun = true;
        return;
    }

    syncing = true;

    try {
        console.log("🚀 SYNC START");

        // ✅ 1 SUBIR
        await uploadPendingActions(uid);

        // ✅ 2 BAJAR
        await downloadRemoteChanges(uid);

        onDownloadComplete?.(); //si fue pasado lo llamamos

        console.log("✅ SYNC END");

    } catch (e) {
        console.log("❌ Sync failed", e);
    } finally {
        syncing = false;

        // 🔥 alguien pidió sync mientras corría
        if (pendingRun) {
            pendingRun = false;
            runSync(uid, onDownloadComplete);
        }
    }
}

/*
[SYNC 1 CORRE]
SYNC 2 → espera
SYNC 3 → espera

termina SYNC 1
↓
corre UN solo sync más

*/
