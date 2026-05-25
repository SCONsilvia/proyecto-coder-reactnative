import { useEffect, useState } from "react";
import { getChallengeByDate } from "../services/database/challengesRepository";

export const useTodayChallenge = () => {

    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);

    // Recarga los datos sin mostrar spinner en refreshes
    useEffect(() => {
        const now = new Date().toISOString().split("T")[0];
        //2026-05-24
        
        const load = async () => {
            const resp = await getChallengeByDate(now);
            
            setChallenge(resp);
            setLoading(false);
        };

        load();
    }, []);

    return { challenge, loading };
};

