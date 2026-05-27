//Thunks de autenticación: manejan lógica async de Firebase fuera de las pantallas

import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/auth/authService";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            await authService.loginUser(email, password);
            return true;
        } catch (errorCode) {
            return rejectWithValue(errorCode);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {            
            await authService.logoutUser();
        } catch (errorCode) {
            return rejectWithValue(errorCode);
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {            
            await authService.registerUser(
                email,
                password
            );
            //no retornamos el user, el listener onAuthStateChanged en sessionManager actualiza el estado
            return true;
        } catch (errorCode) {
            
            return rejectWithValue(errorCode);
        }
    }
);

export const resendVerificationEmail = createAsyncThunk(
    "auth/resendVerificationEmail",
    async (_, { rejectWithValue }) => {
        try {
            await authService.verifyEmailUser();
            return true;
        } catch (errorCode) {
            return rejectWithValue(errorCode);
        }
    }
);

export const checkEmailVerification  = createAsyncThunk(
    "auth/checkEmailVerification",
    async (_, { rejectWithValue }) => {
        try {
            const verified = await authService.reloadUser();
            return verified;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);