import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermissionsAsync();
    //permission.status puede ser "granted" o "denied"

    return permission.status === "granted";
};

export const requestGalleryPermission = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    return permission.status === "granted";
};
