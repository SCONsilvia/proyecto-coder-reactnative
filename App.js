import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import AppContent from "./AppContent";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store = {store}>
        <PersistGate loading = {null} persistor = {persistor}>{/* loading = {null} porque RootNavigator muestra SplashScreen mientras authChecked es false */}
          <AppContent />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

