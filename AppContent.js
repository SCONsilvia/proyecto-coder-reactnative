
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigation/RootNavigator";

import linking from "./src/navigation/LinkingConfiguration";

import { store } from "./src/store/store";

import { startSessionListener } from "./src/core/session/sessionManager";
import { useEffect } from "react";

import { initDatabase, initDatabaseSync, initDatabaseChallenges } from "./src/services/database/database";

import { runSync } from "./src/core/sync/syncEngine";

import NetInfo from "@react-native-community/netinfo";
import { useSelector, useDispatch } from "react-redux";
import { drawingChanged } from "./src/features/drawings/drawingsSlice";

import { registerSyncTrigger, clearSyncTrigger } from "./src/core/sync/syncTrigger";

import { StatusBar } from "expo-status-bar";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

function AppContent() {
    
    const dispatch = useDispatch(); 

    const uid = useSelector(state => state.user.uid);
    const isDark = useSelector(state => state.theme.isDark);

    useEffect(() => {
        let stopSession = null;

        const initDataBaseAsync = async () => {
            await initDatabase();
            await initDatabaseSync();
            await initDatabaseChallenges();

            //Iniciamos el listener de sesión de Firebase
            stopSession = startSessionListener(store);
        };
        // Inicializamos las tablas de SQLite antes de levantar el listener de sesión
        initDataBaseAsync();


        return () => {
            stopSession?.();
        };

    }, []);

    // Sync listener: se activa cuando cambia el uid (login/logout)
    useEffect(() => {
        //si no hay usuario logueado no hacemos nada
        if (!uid) return;

        const onDownload = () => dispatch(drawingChanged()); //para avisar de cambios
        const run = () => runSync(uid, onDownload);

        //para que sincronice siempre al inicio
        run(); // sync inicial

        registerSyncTrigger(run);

        //variable que nos ayudara a saber cuando se pasa de sin internet a con internet
        let wasOnline = false; 

        //Cuando el usuario exista y vuelva el internet, sincronizá los datos.
        const unsubscribe = NetInfo.addEventListener(state => {
            const isOnline = !!(state.isConnected && state.isInternetReachable);

            if (isOnline && !wasOnline) { //solo al RECONECTAR
                run();
            }

            wasOnline = isOnline; //actualiza para la próxima vez
        });
        //Limpiamos el trigger de sync y el listener de red al desmontar o cambiar uid
        return () => {
            clearSyncTrigger();  // limpiamos el trigger
            unsubscribe();
        };

    }, [uid]);

    return (
        <NavigationContainer theme = {isDark ? DarkTheme : DefaultTheme} linking = {linking}>
            <RootNavigator />
            <StatusBar style = {isDark ? "light" : "dark"} />
        </NavigationContainer>
    );
}

export default AppContent;
