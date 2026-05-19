// core/sync/syncTrigger.js

let triggerSync = null;
let syncRequested = false;

export const registerSyncTrigger = (fn) => {
    triggerSync = fn;
};

export function requestSync() {
    if (!triggerSync) return;
    if (syncRequested) return;

    syncRequested = true;

    setTimeout(() => {
        syncRequested = false;
        triggerSync(); // ✅ usamos la función registrada
    }, 2000);
}