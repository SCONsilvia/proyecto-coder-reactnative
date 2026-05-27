import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userReducer from "../features/auth/userSlice";
import drawingsReducer from "../features/drawings/drawingsSlice";
import themeReducer from "../features/theme/themeSlice";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["theme"], // solo persiste el tema, no user ni drawings
};

const rootReducer = combineReducers({
    user: userReducer,
    drawings: drawingsReducer,
    theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH, 
                    REHYDRATE,
                    PAUSE, 
                    PERSIST, 
                    PURGE, 
                    REGISTER],
            },
        }),
});

export const persistor = persistStore(store);


