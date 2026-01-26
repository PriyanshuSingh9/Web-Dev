import { configureStore } from "@reduxjs/toolkit";
import passwordEntryReducer from "./passwordEntry/passwordEntrySlice";

const store = configureStore({
    reducer: {
        passwordEntry: passwordEntryReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;