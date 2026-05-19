import { uploadPendingDrawings } from "./uploadPending";

//para que no hay nunca 2 sync simultaneos
let syncing = false;

export const runSync = async (userId) => {
    if (syncing) return;

    syncing = true;

    try {
        //console.log("Empezando sincronizacion");
        await uploadPendingDrawings(userId);
    } finally {
        syncing = false;
    }
};
