import * as SQLite from "expo-sqlite";

//crear esto fuera del componente es buena practica pues significa una sola conexion, no se creas DB en cada render y es un patron profesional
export const dbPromise = SQLite.openDatabaseAsync("drawings.db");

/*
CREAR TABLA
*/
/*
status:
    pending
    syncing
    failed
    synced
    deleted
*/
export const initDatabase  = async () => {
    try {
        const db = await dbPromise;

        await db.withTransactionAsync(async () => {

            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS drawings (
                    id TEXT PRIMARY KEY,
                    userId TEXT NOT NULL,

                    localUri TEXT NOT NULL,
                    remoteUrl TEXT,

                    width INTEGER,
                    height INTEGER,

                    description TEXT NOT NULL,

                    isArchived INTEGER DEFAULT 0,

                    syncVersion INTEGER DEFAULT 0,
                    lastError Text,

                    status TEXT NOT NULL,
                    pendingAction TEXT NOT NULL,

                    createdAt TEXT NOT NULL,
                    updatedAt TEXT NOT NULL,
                    deleteAt TEXT DEFAULT NULL
                );
            `);

            //ayuda a que SQLite escanee toda la tabla
            // búsquedas por usuario
            await db.execAsync(`
                CREATE INDEX IF NOT EXISTS idx_drawings_gallery
                ON drawings(userId, isArchived);
            `);

            // búsquedas de sincronización
            await db.execAsync(`
                CREATE INDEX IF NOT EXISTS idx_drawings_sync
                ON drawings(userId, status);
            `);

        });

        console.log("Tabla creada correctamente");
    } catch (error) {
        console.error("Error creando tabla", error);
    }
};

