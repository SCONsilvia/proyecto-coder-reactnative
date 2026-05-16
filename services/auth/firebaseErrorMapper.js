export const mapFirebaseErrorToField = (
    errorCode,
    setFieldError
) => {

    switch (errorCode) {

        case "auth/email-already-in-use":
        case "auth/invalid-email":
        case "auth/user-not-found":
            setFieldError("email");
            break;

        case "auth/wrong-password":
        case "auth/weak-password":
            setFieldError("password");
            break;

        case "auth/invalid-credential":
        case "auth/too-many-requests":
        case "auth/network-request-failed":
            setFieldError("general");
            break;

        default:
            setFieldError("general");
    }
};