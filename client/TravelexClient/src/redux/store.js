// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";

const store = configureStore({
    reducer: {
        user: loginReducer,
    },
});

export default store;
