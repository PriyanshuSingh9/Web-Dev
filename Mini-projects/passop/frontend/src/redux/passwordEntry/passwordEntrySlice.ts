import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import type { passwordEntry, PasswordState } from "../../types";

// Define the state structure


const initialState: PasswordState = {
    value: [],
    loading: false,
    error: null
};

export const fetchEntry = createAsyncThunk(
    "passwordEntry/fetchEntry",
    async () => {
        try {

            const response = await fetch("http://localhost:5000/passop/passwords/")
            if (!response.ok) {
                throw new Error("Failed to add entry");
            }
            return await response.json();
        } catch (error) {
            console.log(error)
        }
    }
)

// Async Thunk for adding a password
export const addEntry = createAsyncThunk(
    "passwordEntry/addEntry",
    async (entry: passwordEntry) => {
        const response = await fetch("http://localhost:5000/passop/passwords/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        });
        if (!response.ok) {
            throw new Error("Failed to add entry");
        }
        return await response.json(); // Assuming backend returns the saved entry
    }
);

// Async Thunk for deleting a password
export const deleteEntry = createAsyncThunk(
    "passwordEntry/deleteEntry",
    async (id: string) => {
        const response = await fetch(`http://localhost:5000/passop/passwords/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Failed to delete entry");
        }
        return id; // Return the ID to remove it from state
    }
);

export const passwordEntrySlice = createSlice({
    name: "passwordEntry",
    initialState,
    reducers: {
        // Synchronous reducers can go here if needed
        setEntries: (state, action: PayloadAction<passwordEntry[]>) => {
            state.value = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle addEntry
            .addCase(addEntry.pending, (state) => {
                state.loading = true;
            })
            .addCase(addEntry.fulfilled, (state, action: PayloadAction<passwordEntry>) => {
                state.loading = false;
                state.value.push(action.payload);
            })
            .addCase(addEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add entry";
            })
            // Handle deleteEntry
            .addCase(deleteEntry.fulfilled, (state, action: PayloadAction<string>) => {
                state.value = state.value.filter((item: passwordEntry) => item._id !== action.payload);
            });
    }
});

export const { setEntries } = passwordEntrySlice.actions;
export default passwordEntrySlice.reducer;
