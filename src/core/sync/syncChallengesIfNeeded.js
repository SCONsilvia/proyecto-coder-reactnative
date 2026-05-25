import { getMetadata } from "../../services/database/syncRepository";
import { downloadRemoteChallenges } from "./downloadRemoteChallenges";

const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

export const syncChallengesIfNeeded = async () => {

    const lastChallengeSyncAt = await getMetadata("lastChallengeSyncAt");

    // nunca sincronizó
    if (!lastChallengeSyncAt) {
        await downloadRemoteChallenges();
        return;
    }

    const now = Date.now();

    const diff = now - lastChallengeSyncAt;

    if (diff > ONE_WEEK) {
        await downloadRemoteChallenges();
    } else {
        console.log("📦 Challenges already synced recently");
    }
};
