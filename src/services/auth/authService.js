import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    reload,
} from "firebase/auth";

import { auth } from "../firebase/firebaseApp";

/*
Register
*/
export const registerUser = async (email, password) => {
    try {
        const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        
        await sendEmailVerification(userCredential.user);

        return userCredential.user;
    } catch (error) {
        throw error.code;
    }
};

/*
Verify email
*/
export const verifyEmailUser = async () => {
    const user = auth.currentUser;
    //lo ponemos fuera del try por si da error y entra aca no vaya al catch ya que no existiria error.code
    if (!user) throw "auth/no-current-user";

    try {

        //firebase manda correo automatico
        await sendEmailVerification(user);
        
        return true;
    } catch (error) {
        throw error.code;
    }
};

/*
Reload User
*/
export const reloadUser = async () => {
    const user = auth.currentUser;

    if (!user) throw "no-user";

    await reload(user);

    return user.emailVerified;
};


/*
Login
*/
export const loginUser = async (email, password) => {
    
    try {
        
        const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return userCredential.user;
    } catch (error) {
        throw error.code;
    }
};

/*
Logout
*/
export const logoutUser = async () => {
    try {
        
        await signOut(auth);
    } catch (error) {
        throw error.code;
    }
};
