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


    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {

        resolved = true;
        clearTimeout(timeout);

        // SI hay usuario
        if (firebaseUser) {

            // bloquear si no verificó email
            if (!freshUser.emailVerified) {
                console.log("Email no verificado");

                await auth.signOut();

                store.dispatch(
                    setUser({ uid: null, authChecked: true })
                );

                return;
            }

            // usuario válido
            store.dispatch(setUser({uid: freshUser.uid, authChecked: true,}));

        } else {
            store.dispatch(setUser({uid: null, authChecked: true,}));
        }

    });

    //cleanup TOTAL
    return () => {
        clearTimeout(timeout);
        unsubscribe();//funcion que devuelve onAuthStateChange es un cleapup para limpiar el lsiterne que se crea
    };

};