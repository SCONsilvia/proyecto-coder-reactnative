import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './src/navigation/RootNavigator';

import linking from './src/navigation/LinkingConfiguration';

import { Provider } from 'react-redux';
import { store } from './src/store/store';

import { startSessionListener } from './src/core/session/sessionManager';
import { useEffect } from 'react';

import { initDatabase } from './src/services/database/database';

export default function App() {
  useEffect(() => {
    initDatabase();
    //setup
    const stopSessionListener = startSessionListener(store);

    // cleanup automático
    return () => {
      stopSessionListener();
    };

  }, []);

  return (
    <SafeAreaProvider>
      <Provider store = {store}>

            <NavigationContainer linking = {linking}>
              <RootNavigator />
            </NavigationContainer>

      </Provider>
      
    
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

