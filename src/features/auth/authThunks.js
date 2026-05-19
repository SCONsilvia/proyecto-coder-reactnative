//Un thunk es simplemente una accion de Redux que puede hacer cosas async antes de modificar el estado.
//se usa para sacar logica async de las screens

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
            // NO retornamos el user
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