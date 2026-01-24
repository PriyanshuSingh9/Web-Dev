import { createSlice } from "@reduxjs/toolkit";
import type { passwordEntry } from "../../types";

export const passwordEntrySlice = createSlice({
    name: "passwordEntry",
    initialState: { value: <passwordEntry>[] },
    reducers: {
        addEntry: (state, action: passwordEntry): void => {
            state.value.push(action)
        },
        deleteEntry: (state, action: number): void => {
            state.value.pop(action)
        }
    }
})

export const { addEntry, deleteEntry } = passwordEntrySlice.actions

export default passwordEntrySlice.reducer