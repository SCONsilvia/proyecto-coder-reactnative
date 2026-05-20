import { dbPromise } from "./database";

/*
INSERTAR SESIÓN
*/

export const insertDrawing = async (data, uid,) => {
    try {
        const db = await dbPromise;

        const now = new Date().toISOString();
console.log("c", data);

        await db.runAsync(
            `INSERT INTO drawings
            (id, userId, localUri, remoteUrl, width, height, description, status, pendingAction, syncVersion, lastError, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.id,
                uid,
                data.localUri,
                null,
                data.width,
                data.height,
                data.description,
                "pending",
                "create",
                0,
                null,
                now,
                now,
            ]
        );

        return data.id;

    } catch (error) {
        console.error(error);
        throw error;
    }
};
/*
OBTENER TODOS LOS DRAWINGS
*/
export const getAllDrawings = async (userId) => {
    try {
        
        const db = await dbPromise;

        const drawings = await db.getAllAsync(
            `SELECT * FROM drawings WHERE userId = ? AND isArchived != 1`,
            [userId]
        );

        //console.log("drawings",drawings);

        return drawings;

    } catch (error) {
        console.error("Error obteniendo drawings", error);
        throw error;
    }
};

/*
OBTENER UN DRAWING
*/
export const getDrawingById = async (id, userId) => {
    try {
        const db = await dbPromise;

        const rows  = await db.getAllAsync(
            `SELECT * FROM drawings WHERE id = ? AND userId = ? AND isArchived != 1`,
            [id, userId]
        );

        if (rows.length === 0) return null;

        const drawing = rows[0];

        //console.log("drawing",drawing);

        return drawing;

    } catch (error) {
        console.error("Error obteniendo drawing", error);
        throw error;
    }
};

/*
ACTUALIZAR Drawing
*/
export const updateDrawing = async (data, userId) => {
    try {
        const db = await dbPromise;

        const now = new Date().toISOString();

        const resp = await db.runAsync(
            `UPDATE drawings
            SET description = ?,
                isArchived = ?,
                updatedAt = ?,
                status = "pending",
                pendingAction = "update",
                syncVersion = syncVersion + 1
            WHERE id = ? AND userId = ?`,
            [data.description, data.isArchived, now, data.id, userId]
        );
        console.log("archiva",data, resp);
        

    } catch (error) {
        console.error(error);
        throw error;
    }
};

/*
DELETE
solo marcamos como borrado para que cuando se sincronice a firebase se borra alla y luego lo borramos aca
*/
export const deleteDrawing = async (id, userId) => {
    try {
        const db = await dbPromise;

        await db.runAsync(
            `UPDATE drawings
            SET status = "pending",
            pendingAction = "delete"
            WHERE id = ? AND userId = ?`,
            [id, userId]
        );

    } catch (error) {
        console.error(error);
        throw error;
    }
};

/*
DELETE ALL
*/
export const deleteAllDrawing = async (userId) => {
    try {
        const db = await dbPromise;

        await db.withTransactionAsync(async () => {
            await db.runAsync(`
                DELETE FROM drawings WHERE userId = ?
            `,[userId]);

        });

        console.log("dibujos eliminado");

    } catch (error) {
        console.error("Error eliminandos", error);
        throw error;
    }
};

export const getPendingActions = async (userId) => {
    const db = await dbPromise;

    return await db.getAllAsync(
        `SELECT * FROM drawings
        WHERE userId = ?
        AND status IN ("pending", "failed") 
        ORDER BY updatedAt ASC`,
        [userId]
    );
};

export const markAsSynced = async (id, remoteUrl) => {
console.log("actualizado");

    const db = await dbPromise;

    if(remoteUrl){
        await db.runAsync(
            `UPDATE drawings
            SET status = 'synced',
                pendingAction = NULL,
                remoteUrl = ?
            WHERE id = ?`,
            [remoteUrl, id]
        );
    }else{
        await db.runAsync(
            `UPDATE drawings
            SET status = 'synced',
            pendingAction = NULL
            WHERE id = ?`,
            [id]
        );
    }
    console.log("actualizando completa remoteurl:", remoteUrl);
};

export const markAsFailed = async (id, error) => {
    console.log("marcando como failed", id);

    const db = await dbPromise;

    const now = new Date().toISOString();

    await db.runAsync(
        `UPDATE drawings
        SET status = 'failed',
            updatedAt = ?,
            lastError = ?
        WHERE id = ?`,
        [
            now, 
            JSON.stringify({
                message: error.message,
                code: error.code ?? "unknown",
            }),
            id
        ]
    );
};

export const markAsSyncing = async (id) => {
    const db = await dbPromise;

    await db.runAsync(
        `UPDATE drawings
        SET status = 'syncing'
        WHERE id = ?`,
        [id]
    );
};

export const recoverInterruptedSync = async () => {
    const db = await dbPromise;

    await db.runAsync(`
        UPDATE drawings
        SET status = 'pending'
        WHERE status = 'syncing'
    `);
};

export const upsertRemoteDrawing = async (drawing) => {

    console.log("BD EMPECEMOS", drawing);
    
    const db = await dbPromise;

    console.log("BD ROWS");
    const rows = await db.getAllAsync(
        `SELECT id FROM drawings WHERE id = ?`,
        [drawing.id]
    );

    console.log("BD ROWS2", rows);
    if (rows.length === 0) {
console.log("BD INSERT");
        // INSERT REMOTO
        await db.runAsync(`
            INSERT INTO drawings (
                id,
                userId,
                localUri,
                remoteUrl,
                width,
                height,
                description,
                isArchived,
                status,
                pendingAction,
                syncVersion,
                createdAt,
                updatedAt
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'synced', NULL, ?, ?, ?)
        `,[
            drawing.id,
            drawing.userId,
            drawing.localUri,
            drawing.remoteUrl,
            drawing.width,
            drawing.height,
            drawing.description,
            drawing.isArchived ? 1 : 0,
            drawing.syncVersion ?? 0,
            drawing.createdAt,
            drawing.updatedAt
        ]);
console.log("BD FIN INSERT");
    } else {
console.log("BD UPDATE");
        // UPDATE REMOTO
        await db.runAsync(`
            UPDATE drawings
            SET
                localUri = ?,
                remoteUrl = ?,
                description = ?,
                isArchived = ?,
                syncVersion = ?,
                updatedAt = ?
            WHERE id = ?
        `,[
            drawing.localUri,
            drawing.remoteUrl,
            drawing.description,
            drawing.isArchived ? 1 : 0,
            drawing.syncVersion ?? 0,
            drawing.updatedAt,
            drawing.id
        ]);
        console.log("BD FIN UPDATE");
    }
};

