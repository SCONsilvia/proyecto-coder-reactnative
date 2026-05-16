import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './navigation/RootNavigator';

import linking from './navigation/LinkingConfiguration';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { startSessionListener } from './core/session/sessionManager';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
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

