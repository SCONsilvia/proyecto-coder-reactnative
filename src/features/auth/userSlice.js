import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser, checkEmailVerification, resendVerificationEmail } from "./authThunks";

const initialState = {
    uid: null,
    photoURL: null,
    authChecked: false,
    emailVerified: false,
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
            state.emailVerified = action.payload?.emailVerified ?? state.emailVerified;
        },
    },

    //Maneja los estados loading/error de cada thunk async
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
            //Limpiamos todo el estado del usuario al cerrar sesión
            state.photoURL = null;
            state.emailVerified = false;
            state.loading = false;
            state.error = null;
        })

        //VERIFICAR EMAIL
        .addCase(checkEmailVerification.pending, (state) => {
            state.loading = true;
        })
        .addCase(checkEmailVerification.fulfilled, (state, action) => {
            state.loading = false;
            state.emailVerified = action.payload;
        })
        .addCase(checkEmailVerification.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //REENVIAR VERIFICACION
        .addCase(resendVerificationEmail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(resendVerificationEmail.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(resendVerificationEmail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
