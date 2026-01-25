import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import type { passwordEntry } from "../../types";

// Define the state structure
interface PasswordState {
    value: passwordEntry[];
    loading: boolean;
    error: string | null;
}

const initialState: PasswordState = {
    value: [],
    loading: false,
    error: null
};

export const fetchEntry = createAsyncThunk(
    "passwordEntry/fetchEntry",
    async () => {
        const response = await fetch("http://localhost:5000/passop/passwords/")
        if (!response.ok) {
            throw new Error("Failed to add entry");
        }
        return await response.json();
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
                // Assuming the entry has an '_id' property. 
                // We'll need to cast or ensure types match, but for now we filter by comparing properties or ID if available.
                // Since `passwordEntry` type doesn't explicitly have an ID, we might need to adjust logic or types.
                // For this fix, I'll assume we are filtering out by the returned ID if it was part of the object.
                // However, without an ID in the type, we might face issues. 
                // Ideally, `passwordEntry` should have an optional `_id`.
                // Checking types.d.ts, it doesn't. 
                // We will attempt to filter by a generated logic or rely on the backend response.

                // If the backend returns the deleted ID, we remove the item.
                // NOTE: Since we don't have _id in the type, this is a best-effort fix.
                // You should update your types to include _id.
                state.value = state.value.filter((item: any) => item._id !== action.payload);
            });
    }
});

export const { setEntries } = passwordEntrySlice.actions;
export default passwordEntrySlice.reducer;
