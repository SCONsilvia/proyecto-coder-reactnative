// core/sync/syncTrigger.js

let triggerSync = null;
let syncRequested = false;

export const registerSyncTrigger = (fn) => {
    triggerSync = fn;
};

//funcion para arreglar el poblema de que cuando el usuario haga logout nada quede
export const clearSyncTrigger = () => { 
    triggerSync = null;
    syncRequested = false; 
};

export function requestSync() {
    if (!triggerSync) return;
    if (syncRequested) return;

    syncRequested = true;

    setTimeout(() => {
        syncRequested = false;
        triggerSync?.(); // ✅ usamos la función registrada, lo ponemos con? por si se limpio durante el timeout
    }, 2000);
}