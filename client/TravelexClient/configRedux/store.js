// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import destinationReducer from "../src/features/destinationSlice";

const store = configureStore({
    reducer: {
        destination: destinationReducer,
        // Add other slices if you have more
    },
});

export default store;
