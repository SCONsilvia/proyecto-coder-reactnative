import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseApp";

import { setUser } from "../../features/auth/userSlice";

export const startSessionListener = (store) => {

    let resolved = false;

    // 🧠 Timeout de seguridad (ej: 5 segundos)
    const timeout = setTimeout(() => {
        if (!resolved) {
            console.log("⚠️ Firebase no respondió → fallback");

            store.dispatch(
                setUser({
                    uid: null,
                    authChecked: true,
                })
            );
        }
    }, 5000);


    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        resolved = true;
        clearTimeout(timeout);
        
        if (firebaseUser) {
            store.dispatch(setUser({ uid: firebaseUser.uid, authChecked: true }));
        } else {
            store.dispatch(setUser({ uid: null, authChecked: true }));
        }

    });

    //cleanup TOTAL
    return () => {
        clearTimeout(timeout);
        unsubscribeAuth();//funcion que devuelve onAuthStateChange es un cleapup para limpiar el lsiterne que se crea
    };

};