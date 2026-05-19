import { uploadPendingActions } from "./uploadPending";

//para que no hay nunca 2 sync simultaneos
let syncing = false;
let pendingRun = false;

export async function runSync(uid) {

    // 🚫 ya hay sync corriendo
    if (syncing) {
        console.log("⏳ Sync already running → queued");
        pendingRun = true;
        return;
    }

    syncing = true;

    try {
        console.log("🚀 SYNC START");

        await uploadPendingActions(uid);

        console.log("✅ SYNC END");

    } catch (e) {
        console.log("❌ Sync failed", e);
    } finally {
        syncing = false;

        // 🔥 alguien pidió sync mientras corría
        if (pendingRun) {
            pendingRun = false;
            runSync(uid);
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
