import { configureStore } from "@reduxjs/toolkit";

// reducers (slices) de la aplicación
import userReducer from "../features/auth/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});


