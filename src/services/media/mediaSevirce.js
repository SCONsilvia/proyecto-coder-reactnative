import * as ImagePicker from "expo-image-picker";
import { 
    requestCameraPermission, 
    requestGalleryPermission 
} from "../../permissions/permissionService";

export const openCamera = async () => {

    // 1 pedir permiso de cámara
    const allowed = await requestCameraPermission();
    if (!allowed) return null;

    // 2 abrir cámara del dispositivo
    const result = await ImagePicker.launchCameraAsync({
        quality: 1, // calidad máxima
    });

    // 3 usuario canceló
    if (result.canceled) return null;

    // 4 devolver imagen capturada
    const asset = result.assets[0];

    return {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        fileName: asset.fileName ?? null,
    };
};

export const openGallery = async () => {
    // 4 pedir permiso
    const allowed = await requestGalleryPermission();
    if (!allowed) return null;

    // 2 abrir galería
    const result = await ImagePicker.launchImageLibraryAsync({
        quality: 0.7,//compresion 0 = super comprimido 1 = maxima calidad el recomentado es 0.7 por que es menos peso menos RAM y sube mas rapido
        exif: false,//metadatos de la imagen si es true obtendras GPD orientacion, camara usada
    });

    // 3 usuario canceló?
    if (result.canceled) return null;

    const asset = result.assets[0];

    return {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        fileName: asset.fileName ?? null,
    };
};

