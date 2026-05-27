import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/userSlice";
import drawingsReducer from "../features/drawings/drawingsSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        drawings: drawingsReducer,
        theme: themeReducer,
    },
});


