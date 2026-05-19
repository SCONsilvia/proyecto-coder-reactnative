import { dbPromise } from "./database";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

/*
INSERTAR SESIÓN
*/

export const insertDrawing = async (data, uid) => {
    try {
        const db = await dbPromise;

        const id = nanoid();
        const now = new Date().toISOString();

        await db.runAsync(
            `INSERT INTO drawings
            (id, userId, localUri, remoteUrl, description, status, syncVersion, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id,
                uid,
                data.localUri,
                null,
                data.description,
                "pending",
                0,
                now,
                now,
            ]
        );

        return id;

    } catch (error) {
        console.error(error);
        //error silenciosos arreglar
    }
};
/*
OBTENER TODOS LOS DRAWINGS
*/
export const getAllDrawings = async (userId) => {
    try {
        
        const db = await dbPromise;

        const drawings = await db.getAllAsync(
            `SELECT * FROM drawings WHERE userId = ?`,
            [userId]
        );

        console.log("drawings",drawings);

        return drawings;

    } catch (error) {
        console.error("Error obteniendo drawings", error);
        return null;
    }
};

/*
OBTENER UN DRAWING
*/
export const getDrawingById = async (id, userId) => {
    try {
        const db = await dbPromise;

        const rows  = await db.getAllAsync(
            `SELECT * FROM drawings WHERE id = ? AND userId = ?`,
            [id, userId]
        );

        if (rows.length === 0) return null;

        const drawing = rows[0];

        console.log("drawing",drawing);

        return drawing;

    } catch (error) {
        console.error("Error obteniendo drawing", error);
        return null;
    }
};

/*
ACTUALIZAR Drawing
*/
export const updateDrawing = async (data, userId) => {
    try {
        const db = await dbPromise;

        const now = new Date().toISOString();

        await db.runAsync(
            `UPDATE drawings
            SET description = ?,
                updatedAt = ?,
                status = "pending",
                syncVersion = syncVersion + 1
            WHERE id = ? AND userId = ?`,
            [data.description, now, data.id, userId]
        );

    } catch (error) {
        console.error(error);
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
            SET status = "deleted"
            WHERE id = ? AND userId = ?`,
            [id, userId]
        );

    } catch (error) {
        console.error(error);
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
    }
};

export const getPendingDrawings = async (userId) => {
    const db = await dbPromise;

    return await db.getAllAsync(
        `SELECT * FROM drawings
        WHERE userId = ?
        AND status IN ("pending","deleted")`,
        [userId]
    );
};
