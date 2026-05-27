import { useEffect, useState, useCallback } from "react";
import { AppState } from "react-native";
import { getChallengeByDate } from "../services/database/challengesRepository";
import { downloadRemoteChallenges } from "../core/sync/downloadRemoteChallenges";

export const useTodayChallenge = () => {

    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const today = () => new Date().toISOString().split("T")[0];//devuelve "YYYY-MM-DD" en UTC

    const fetchWithFallback = useCallback(async () => {
        let resp = await getChallengeByDate(today());
        if (!resp) {
            try {
                await downloadRemoteChallenges();
                resp = await getChallengeByDate(today());
            } catch {
                // sin internet, quedamos con null
            }
        }
        return resp;
    }, []);

    const load = useCallback(async () => {
        try {
            setError(null);
            const resp = await fetchWithFallback();
            setChallenge(resp);
        } catch (err) {
            setError(err.message ?? "Error al cargar el desafío");
        } finally {
            setLoading(false);
        }
    }, [fetchWithFallback]);

    const refresh = useCallback(async () => {
        try {
            setError(null);
            const resp = await fetchWithFallback();
            setChallenge(resp);
        } catch (err) {
            setError(err.message ?? "Error al actualizar el desafío");
        }
    }, [fetchWithFallback]);

    useEffect(() => {
        load();
    }, [load]);

    // Recarga cuando el usuario vuelve a la app (cambio de día)
    useEffect(() => {
        const sub = AppState.addEventListener("change", (state) => {
            if (state === "active") load();
        });
        return () => sub.remove();
    }, [load]);

    return { challenge, loading, refresh, error  };
};

