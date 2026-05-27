import { dbPromise } from "./database";

export const insertChallenge = async (data) => {
    const db = await dbPromise;

    await db.runAsync(
        `INSERT OR REPLACE INTO challenges (id, title, date)
        VALUES (?,?,?)`,
        [data.id, data.title, data.date]
    );
};

export const getChallengeById = async (id) => {
    const db = await dbPromise;

    const rows = await db.getFirstAsync(
        `SELECT * FROM challenges WHERE id = ?`,
        [id]
    );

    return rows ?? null;
};

export const getChallengeByDate = async (date) => {
    const db = await dbPromise;

    const rows = await db.getFirstAsync(
        `SELECT * FROM challenges WHERE date = ?`,
        [date]
    );
    
    return rows ?? null;
};

