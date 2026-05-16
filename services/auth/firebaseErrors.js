export const firebaseAuthErrors = {
    "auth/email-already-in-use":
        "Este correo ya está registrado.",

    "auth/invalid-email":
        "El correo electrónico no es válido.",

    "auth/user-not-found":
        "No existe una cuenta con este correo.",

    "auth/wrong-password":
        "La contraseña es incorrecta.",

    "auth/weak-password":
        "La contraseña debe tener al menos 6 caracteres.",

    "auth/invalid-credential":
        "La contraseña y el email no coinciden",

    "auth/too-many-requests": 
        "Demasiados intentos. Esperá unos segundos antes de intentar nuevamente.",

    "auth/network-request-failed":
        "Sin conexión, revisá tu internet.",
        
    default:
        "Ocurrió un error inesperado."
};

export const getFirebaseErrorMessage = (errorCode) => {
    return firebaseAuthErrors[errorCode]
        || firebaseAuthErrors.default;
};