// services/drawingService.js

import * as drawingRepository from "./drawingRepository";
import { saveImage, deleteImage } from "../storage/imageStorage";
import { requestSync } from "../../core/sync/syncTrigger";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

export const createDrawingWithImage = async (data, asset, uid) => {

    let savedUri = null;

    try {
        if (!uid) throw new Error("UserId requerido");
        const id = nanoid();
console.log("0");

        // 1 guardar imagen
        savedUri = await saveImage(asset.uri, uid, id);
console.log("1", asset);

        // 2 guardar DB
        await drawingRepository.insertDrawing({
            id : id,
            localUri: savedUri,
            width: asset.width,
            height: asset.height,
            description: data.description,
        }, uid);
console.log("2");

        requestSync();
        return { drawingId : id, savedUri };

    } catch (error) {

        // 🔥 ROLLBACK MANUAL
        console.log("ROOOO", error);
        
        if (savedUri) {
            await deleteImage(savedUri);
        }

        throw error;
    }
};

/*
CREAR DRAWING
*/
export const createDrawing = async (data, userId) => {
    try {
        if (!userId) throw new Error("UserId requerido");

        if (!data?.localUri) {
            throw new Error("localUri requerido");
        }

        const id = await drawingRepository.insertDrawing(data, userId);

        // 🔥 futuro offline-first
        // enqueueSync()

        return id;

    } catch (error) {
        console.error("createDrawing error", error);
        throw error;
    }
};


/*
OBTENER TODOS
*/
export const getUserDrawings = async (userId) => {
    try {
        if (!userId) return [];

        return await drawingRepository.getAllDrawings(userId);

    } catch (error) {
        console.error(error);
        return [];
    }
};


/*
OBTENER UNO
*/
export const getDrawing = async (id, userId) => {
    try {
        if (!id || !userId) return null;

        return await drawingRepository.getDrawingById(id, userId);

    } catch (error) {
        console.error(error);
        return null;
    }
};


/*
ACTUALIZAR
*/
export const updateDrawing = async (data, userId) => {
    try {
        if (!data?.id) throw new Error("ID requerido");

        await drawingRepository.updateDrawing(data, userId);

        console.log("Se supone que se llama");
        
        requestSync();
        // 🔥 marcar para sync automática
        // enqueueSync()

    } catch (error) {
        console.error("updateDrawing error", error);
        throw error;
    }
};


/*
ELIMINAR (soft delete offline-first)
*//*
export const deleteDrawing = async (id, userId) => {
    try {
        await drawingRepository.deleteDrawing(id, userId);

        // 🔥 se sincronizará luego
        // enqueueSync()

    } catch (error) {
        console.error(error);
        throw error;
    }
};

*/
/*
BORRAR TODO DEL USER
*//*
export const deleteAllUserDrawings = async (userId) => {
    try {
        await drawingRepository.deleteAllDrawing(userId);

    } catch (error) {
        console.error(error);
        throw error;
    }
};
*/

/*
OBTENER PENDIENTES PARA SYNC
*/
export const getPendingActions = async (userId) => {
    try {
        return await drawingRepository.getPendingActions(userId);
    } catch (error) {
        console.error(error);
        return [];
    }
};
