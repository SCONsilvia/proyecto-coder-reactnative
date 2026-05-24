import { upsertRemoteDrawing, markPendingUpdate, markAsSynced } from "../../services/database/drawingRepository";
import { requestSync } from "./syncTrigger";

export const resolveConflict = async (localDrawing, remote) => {

    console.log("⚠️ CONFLICT DETECTED");

    console.log("LOCAL     ",localDrawing,"REMOTO    ", remote);
    
    // estrategia simple profesional:
    // LAST EDIT WINS usando updatedAt
    const remoteMs = remote.updatedAtServer?.toMillis?.() ?? 0;
    if (new Date(localDrawing.updatedAt).getTime() > remoteMs) {

        console.log("LOCAL WINS");
        //si gana local ponemos status en pending y  pendingAction en update para que se suba cuando hagamos requesSync

        //ya que vamos a actualizar de una vez en updateMetada entonce no marcamos nada mejor
        // aseguramos que vuelva a subirse
        //await markPendingUpdate(localDrawing.id);

        //esto ya no lo requerimos ya que en updateMetaData vamos a cambiar los datos del firebase ahi mismo
        // pisamos remoto después
        //requestSync();

        return "LOCAL_WINS";

    } else {

        console.log("REMOTE WINS");
        //si gana remote debemos descargar los cambios a  la base de datos local y luego marcamos status en sincronizado

        // pisamos local
        await upsertRemoteDrawing(remote);

        //  marcamos synced para evitar loop, ya lo hacemos con la funcion de arriba
        //await markAsSynced(remote.id);

        return "REMOTE_WINS";
    }
};