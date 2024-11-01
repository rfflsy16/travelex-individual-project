import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.post(`http://localhost:3000/user/login`, { email, password });
            localStorage.setItem("access_token", data.access_token);
            return data.access_token;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const googleLogin = createAsyncThunk(
    "auth/googleLogin",
    async (credential, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/user/google/login`,
                null,
                { headers: { token: credential } }
            );
            localStorage.setItem("access_token", data.access_token);
            return data.access_token;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const loginSlice = createSlice({
    name: "auth",
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
