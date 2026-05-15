import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./authThunks";

const initialState = {
    uid: null,
    photoURL: null,
    authChecked: false,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        setUser(state, action) {
            state.uid = action.payload?.uid ?? null;
            state.authChecked = action.payload?.authChecked ?? state.authChecked;
        },
    },

    extraReducers: (builder) => {
        builder

        // LOGIN
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(loginUser.fulfilled, (state) => {
            state.loading = false;
        })

        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // REGISTER
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
        })

        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // LOGOUT
        .addCase(logoutUser.fulfilled, (state) => {
            state.uid = null;
        });
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
