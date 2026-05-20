import { dbPromise } from "./database";

export const getMetadata = async (key) => {
    const db = await dbPromise;

    const rows = await db.getAllAsync(
        `SELECT value FROM sync_metadata WHERE key = ?`,
        [key]
    );

    return rows[0]?.value ?? null;
};

export const setMetadata = async (key, value) => {
    const db = await dbPromise;

    await db.runAsync(
        `INSERT OR REPLACE INTO sync_metadata (key,value)
         VALUES (?,?)`,
        [key, value]
    );
};
