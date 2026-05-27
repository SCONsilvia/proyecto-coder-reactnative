import {
    collection,
    getDocs
} from "firebase/firestore";

import { db } from "../../services/firebase/firebaseApp";
import { insertChallenge } from "../../services/database/challengesRepository";
import { setMetadata } from "../../services/database/syncRepository";

export const downloadRemoteChallenges = async () => {

    console.log("⬇️ DOWNLOADING REMOTE CHALLENGES");

    const snapshot = await getDocs(
        collection(db, "challenges")
    );

    for (const challengeDoc of snapshot.docs) {
        await insertChallenge(
            challengeDoc.data()
        );
    }

    const now = Date.now();
    await setMetadata("lastChallengeSyncAt", now);

    console.log("✅ DOWNLOAD CHALLENGE COMPLETE");
};


