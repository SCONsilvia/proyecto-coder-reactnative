import * as SQLite from "expo-sqlite";
import { nanoid } from "nanoid";

//crear esto fuera del componente es buena practica pues significa una sola conexion, no se creas DB en cada render y es un patron profesional
const dbPromise = SQLite.openDatabaseAsync("drawings.db");

/*
CREAR TABLA
*/

export const createDrawingTable = async () => {
    try {
        const db = await dbPromise;

        await db.withTransactionAsync(async () => {

            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS drawings (
                    id TEXT PRIMARY KEY,
                    userId TEXT NOT NULL,
                    localUri TEXT NOT NULL,
                    remoteUrl TEXT,
                    description TEXT NOT NULL,
                    status TEXT NOT NULL,
                    createdAt TEXT NOT NULL,
                    updatedAt TEXT NOT NULL
                );
            `);

            //ayuda a que SQLite escanee toda la tabla
            await db.execAsync(`
                CREATE INDEX IF NOT EXISTS idx_drawings_userId
                ON drawings(userId);
            `);

        });

        console.log("Tabla creada correctamente");
    } catch (error) {
        console.error("Error creando tabla", error);
    }
};

/*
INSERTAR SESIÓN
*/

export const insertDrawing = async (data, uid) => {
    try {
        const db = await dbPromise;

        const id = nanoid();
        const now = new Date().toISOString();

        await db.withTransactionAsync(async () => {
        //si existe remplaza si no crea
            await db.runAsync(
                `INSERT INTO drawings
                (id, userId, localUri, remoteUrl, description, status, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    id,
                    uid,
                    data.localUri,
                    null,
                    data.description,
                    "pending",
                    now,
                    now,
                ]
            );
        });

        console.log("Drawing insertada");
    } catch (error) {
        console.error("Error insertando Drawing", error);
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

        const drawing = await db.getOneAsync(
            `SELECT * FROM drawings WHERE id = ? AND userId = ?`,
            [id, userId]
        );

        if (!drawing) return null;

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

        await db.withTransactionAsync(async () => {

            await db.runAsync(
                `UPDATE drawings
                SET description = ?, updatedAt = ?
                WHERE id = ? AND userId = ?`,
                [data.description, now, data.id, userId]
            );

        });

        console.log("drawing actualizada");
    } catch (error) {
        console.error("Error actualizando drwain", error);
    }
};

/*
DELETE
*/
export const deleteDrawing = async (id, userId) => {
    try {
        const db = await dbPromise;

        await db.withTransactionAsync(async () => {
            await db.runAsync(`
                DELETE FROM drawings WHERE id = ? AND userId = ?
            `,[id, userId]);

        });

        console.log("dibujo eliminado");

    } catch (error) {
        console.error("Error eliminando", error);
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