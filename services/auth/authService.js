import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
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
        
        return userCredential.user;
    } catch (error) {
        throw error.code;
    }
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
