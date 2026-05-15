import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseApp";

import { setUser } from "../../features/auth/userSlice";

export const startSessionListener = (store) => {

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        
        if (firebaseUser) {
            store.dispatch(setUser({ uid: firebaseUser.uid, authChecked: true }));
        } else {
            store.dispatch(setUser({ uid: null, authChecked: true }));
        }

    });

    return unsubscribe;

};