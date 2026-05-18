import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermissionsAsync();
    //esto devuelve
    /*{
        status: "granted" | "denied",
        granted: true/false,
        canAskAgain: true/false
    }*/

    return permission.status === "granted";
};

export const requestGalleryPermission = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    return permission.status === "granted";
};
