// loginSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    "user/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`http://localhost:3000/user/login`, { email, password });
            localStorage.setItem("access_token", data.access_token);
            console.log("Login berhasil, token:", data.access_token);
            return data.access_token;
        } catch (error) {
            console.error("Error saat login:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const googleLogin = createAsyncThunk(
    "user/google/login",
    async (codeResponse, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `http://localhost:3000/user/google/login`,
                null,
                { headers: { token: codeResponse.credential } }
            );
            localStorage.setItem("access_token", data.access_token);
            console.log("Google login berhasil, token:", data.access_token);
            return data.access_token;
        } catch (error) {
            console.error("Error saat Google login:", error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const loginSlice = createSlice({
    name: "user",
    initialState: {
        accessToken: localStorage.getItem("access_token") || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("access_token");
            state.accessToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(googleLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
