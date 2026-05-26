// services/drawingService.js

import * as drawingRepository from "./drawingRepository";
import { saveImage, deleteImage } from "../storage/imageStorage";
import { requestSync } from "../../core/sync/syncTrigger";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

/*
CREAR DRAWING
*/
export const createDrawingWithImage = async (data, asset, uid) => {

    let savedUri = null;

    try {
        if (!uid) throw new Error("UserId requerido");
        const id = nanoid();

        // 1 guardar imagen
        savedUri = await saveImage(asset.uri, uid, id);

        // 2 guardar DB
        await drawingRepository.insertDrawing({
            id : id,
            localUri: savedUri,
            width: asset.width,
            height: asset.height,
            title: data.title,
            description: data.description,
            challengeId: data.challengeId,
        }, uid);

        requestSync();
        return { drawingId : id, savedUri };

    } catch (error) {

        //ROLLBACK MANUAL
        console.log("ROLLBACK", error);
        
        if (savedUri) {
            await deleteImage(savedUri);
        }

        throw error;
    }
};


/*
OBTENER TODOS
*/
export const getUserDrawings = async (userId) => {
    try {
        if (!userId) return [];

        return await drawingRepository.getActiveDrawings(userId);

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
        
        requestSync();

    } catch (error) {
        console.error("updateDrawing error", error);
        throw error;
    }
};

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
