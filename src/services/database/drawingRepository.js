import { dbPromise } from "./database";

/*
INSERTAR DRAWING
*/

export const insertDrawing = async (data, uid,) => {
    try {
        const db = await dbPromise;

        const now = Date.now(); 

        await db.runAsync(
            `INSERT INTO drawings
            (id, userId, localUri, remoteUrl, width, height, title, description, challengeId, status, pendingAction, syncVersion, basedOnVersion, lastError, createdAt, updatedAtClient, updatedAtServer)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.id,
                uid,
                data.localUri,
                null,
                data.width,
                data.height,
                data.title,
                data.description,
                data.challengeId,
                "pending",
                "create",
                0,
                0,
                null,
                now,
                now,
                null,
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

        const now = Date.now(); 

        //si aún no se subió (create pendiente), no lo pisamos con "update" ya que llegaría a Firebase sin imagen
        await db.runAsync(
            `UPDATE drawings
            SET title = ?,
                description = ?,
                isArchived = ?,
                updatedAtClient = ?,
                status = "pending",

                pendingAction =
                    CASE
                        WHEN pendingAction = 'create'
                        THEN 'create'
                        ELSE 'update'
                    END,
            
                syncVersion = syncVersion + 1
            WHERE id = ? AND userId = ?`,
            [data.title, data.description, data.isArchived, now, data.id, userId]
        );        

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getPendingActions = async (userId) => {
    const db = await dbPromise;

    return await db.getAllAsync(
        `SELECT * FROM drawings
        WHERE userId = ?
        AND status IN ("pending", "failed") 
        ORDER BY updatedAtClient ASC`,
        [userId]
    );
};

export const markAsSynced = async (id, data, remoteUrl) => {
    const db = await dbPromise;
    const updatedAtServerMs = data.updatedAtServer?.toMillis?.() ?? null;

    if(remoteUrl){
        await db.runAsync(
            `UPDATE drawings
            SET status = 'synced',
                pendingAction = NULL,
                basedOnVersion = ?,
                updatedAtServer = ?,
                remoteUrl = ?
            WHERE id = ?`,
            [data.syncVersion, updatedAtServerMs, remoteUrl, id]
        );
    }else{
        await db.runAsync(
            `UPDATE drawings
            SET status = 'synced',
            pendingAction = NULL,
            basedOnVersion = ?,
            updatedAtServer = ?
            WHERE id = ?`,
            [data.syncVersion, updatedAtServerMs, id]
        );
    }
};

export const markAsFailed = async (id, error) => {
    const db = await dbPromise;

    const now = Date.now(); 

    await db.runAsync(
        `UPDATE drawings
        SET status = 'failed',
            updatedAtClient = ?,
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

export const markPendingUpdate = async (id) => {
    const db = await dbPromise;

    await db.runAsync(`
        UPDATE drawings
        SET status = 'pending',
            pendingAction = 'update'
        WHERE id = ?
    `, [id]);
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
    const db = await dbPromise;

    const rows = await db.getAllAsync(
        `SELECT id FROM drawings WHERE id = ?`,
        [drawing.id]
    );

    if (rows.length === 0) {
        // INSERT REMOTO
        await db.runAsync(`
            INSERT INTO drawings (
                id,
                userId,
                localUri,
                remoteUrl,
                width,
                height,
                title,
                description,
                challengeId,
                isArchived,
                status,
                pendingAction,
                syncVersion,
                basedOnVersion,
                createdAt,
                updatedAtClient,
                updatedAtServer
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'synced', NULL, ?, ?, ?, ?, ?)
        `,[
            drawing.id,
            drawing.userId,
            drawing.localUri,
            drawing.remoteUrl,
            drawing.width,
            drawing.height,
            drawing.title,
            drawing.description,
            drawing.challengeId,
            drawing.isArchived ? 1 : 0,
            drawing.syncVersion ?? 0,
            drawing.syncVersion ?? 0,
            drawing.createdAt,
            drawing.updatedAtClient,
            drawing.updatedAtServer?.toMillis()
        ]);
    } else {
        // UPDATE REMOTO
        await db.runAsync(`
            UPDATE drawings
            SET
                remoteUrl = ?,
                title = ?,
                description = ?,
                challengeId = ?,
                isArchived = ?,
                syncVersion = ?,
                updatedAtClient = ?,
                status = ?,
                pendingAction = ?,
                basedOnVersion = ?,
                updatedAtServer = ?
            WHERE id = ?
        `,[
            drawing.remoteUrl,
            drawing.title,
            drawing.description,
            drawing.challengeId,
            drawing.isArchived ? 1 : 0,
            drawing.syncVersion ?? 0,
            drawing.updatedAtClient,
            "synced",
            null,
            drawing.syncVersion ?? 0,
            drawing.updatedAtServer?.toMillis(),
            drawing.id
        ]);
    }
};

/*
OBTENER DATOS PARA CALENDAR
*/
export const getDrawingDays = async (userId) => {
    try {
        const db = await dbPromise;

        const rows  = await db.getAllAsync(
            `SELECT
                date(createdAt / 1000, 'unixepoch') as drawingDay,
                COUNT(*) as total
            FROM drawings
            WHERE userId = ?
            GROUP BY drawingDay;`,
            [userId]
        );

        if (rows.length === 0) return null;

        return rows;

    } catch (error) {
        console.error("Error obteniendo drawing Calendar", error);
        throw error;
    }
};
