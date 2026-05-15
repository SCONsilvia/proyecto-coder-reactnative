import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './navigation/RootNavigator';

import linking from './navigation/LinkingConfiguration';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { startSessionListener } from './core/session/sessionManager';
startSessionListener(store);

export default function App() {
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
