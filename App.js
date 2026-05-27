import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import AppContent from "./AppContent";

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store = {store}>
        <AppContent />
      </Provider>
    </SafeAreaProvider>
  );
}

