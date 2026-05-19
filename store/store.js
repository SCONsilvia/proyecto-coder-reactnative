import { configureStore } from "@reduxjs/toolkit";

// reducers (slices) de la aplicación
import userReducer from "../features/auth/userSlice";
import drawingsReducer from "../features/drawings/drawingsSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        drawings: drawingsReducer,
    },
});


