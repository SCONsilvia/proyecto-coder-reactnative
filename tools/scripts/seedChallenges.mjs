
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig.mjs";

import challenges from "../data/challenges.json" assert { type: "json" };

const seedChallenges = async () => {
    try {

        for (const challenge of challenges) {

            await setDoc(
                doc(db, "challenges", challenge.id),
                challenge
            );

            console.log("Subido:", challenge.id);
        }

        console.log("Seed completado");

    } catch (error) {
        console.error(error);
    }
};

seedChallenges();
