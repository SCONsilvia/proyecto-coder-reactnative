import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseApp";

import { setUser } from "../../features/auth/userSlice";

export const startSessionListener = (store) => {

    let resolved = false;

    //Timeout de seguridad (ej: 5 segundos)
    // si Firebase no responde en 5s (sin internet en primer boot), forzamos authChecked para no quedar bloqueados en SplashScreen
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


    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {

        resolved = true;
        clearTimeout(timeout);

        // SI hay usuario
        if (firebaseUser) {
            // usuario válido
            store.dispatch(setUser({uid: firebaseUser.uid, emailVerified: firebaseUser.emailVerified, authChecked: true,}));

        } else {
            store.dispatch(setUser({uid: null, emailVerified: false, authChecked: true,}));
        }

    });

    //Cancela el timeout y el listener de Firebase al desmontar
    return () => {
        clearTimeout(timeout);
        unsubscribe();
    };

};