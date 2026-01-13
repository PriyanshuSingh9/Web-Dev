import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "Cart",
    initialState: { value: [] },
    reducers: {
        addItem: (state, action) => {
            state.value.push(action.payload)
        }
    }
})

export const { addItem } = cartSlice.actions
export default cartSlice.reducer