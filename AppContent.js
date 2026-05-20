
import { NavigationContainer } from '@react-navigation/native';

import RootNavigator from './src/navigation/RootNavigator';

import linking from './src/navigation/LinkingConfiguration';

import { store } from './src/store/store';

import { startSessionListener } from './src/core/session/sessionManager';
import { useEffect } from 'react';

import { initDatabase, initDatabaseSync } from './src/services/database/database';

import { useNetInfo } from '@react-native-community/netinfo';
import { runSync } from './src/core/sync/syncEngine';

import NetInfo from "@react-native-community/netinfo";
import { useSelector, useDispatch } from 'react-redux';
import { drawingChanged } from './src/features/drawings/drawingsSlice';

import { registerSyncTrigger, clearSyncTrigger } from './src/core/sync/syncTrigger';

function AppContent() {
    
    const dispatch = useDispatch(); 

    const uid = useSelector(state => state.user.uid);

    useEffect(() => {
        const initDataBaseAsync = async () => {
            await initDatabase();
            await initDatabaseSync();
        };
        // ✅ SQLite
        initDataBaseAsync();

        // ✅ Firebase Auth listener
        const stopSessionListener = startSessionListener(store);

        return () => {
            stopSessionListener();
        };

    }, []);

    // ✅ Sync listener separado
    useEffect(() => {
        //si no hay usuaio logueado no hacemos nada
        if (!uid) return;
console.log("conentando");

        const onDownload = () => dispatch(drawingChanged()); //para avisar de cambios
        const run = () => runSync(uid, onDownload);

        //para que sincronice siempre al inicio
        run(); // sync inicial

        registerSyncTrigger(run);

        //Cuando el usuario exista y vuelva el internet, sincronizá los datos.
        const unsubscribe = NetInfo.addEventListener(state => {
        if (state.isConnected && state.isInternetReachable) {
            run();
        }
        });
console.log("conexion lista");
        //eliminamos el listener
        return () => {
            clearSyncTrigger();  // limpiamos el trigger
            unsubscribe();
        };

    }, [uid]);

    return (
        <NavigationContainer linking={linking}>
            <RootNavigator />
        </NavigationContainer>
    );
}

export default AppContent;
