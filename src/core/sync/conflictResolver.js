import { upsertRemoteDrawing, markPendingUpdate, markAsSynced } from "../../services/database/drawingRepository";
import { requestSync } from "./syncTrigger";

export const resolveConflict = async (localDrawing, remote) => {

    console.log("⚠️ CONFLICT DETECTED");

    console.log("LOCAL     ",localDrawing,"REMOTO    ", remote);
    
    // estrategia simple profesional:
    // LAST EDIT WINS usando updatedAt
    const localTime = localDrawing.updatedAtServer ?? localDrawing.updatedAtClient ?? 0;//aca en la db ya el dato se guardo como toMillis

    const remoteTime = remote.updatedAtServer?.toMillis?.() ?? remote.updatedAtClient ?? 0;
    if (localTime > remoteTime) {

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