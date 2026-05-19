import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    version: 0, // cambia cuando algo modifica dibujos
};

const drawingsSlice = createSlice({
    name: "drawings",
    initialState,
    reducers: {

        drawingChanged: (state) => {
            state.version += 1;
        },

    },
});

export const { drawingChanged } = drawingsSlice.actions;
export default drawingsSlice.reducer;
