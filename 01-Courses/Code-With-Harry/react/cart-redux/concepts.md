# Concepts Used

## Libraries
- **react-redux**: Official React bindings for Redux.
- **@reduxjs/toolkit**: The official, opinionated, batteries-included toolset for efficient Redux development.

## Core Concepts
- **Provider**: Wraps the React application to make the Redux store available to all components.
- **configureStore**: Simplifies the process of setting up the Redux store with good defaults.
- **createSlice**: Generates action creators and action types that correspond to the reducers and state.
- **useSelector**: A hook to access data from the Redux store state.
- **useDispatch**: A hook to access the Redux dispatch function to dispatch actions.

## Implementation Details

### Creating a Slice (`redux/cart/cartSlice.js`)
The `createSlice` API simplifies defining the state and reducers.
```javascript
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "Cart",
    initialState: { value: [] },
    reducers: {
        addItem: (state, action) => {
            // Immer allows us to write "mutating" logic
            state.value.push(action.payload)
        }
    }
})

export const { addItem } = cartSlice.actions
export default cartSlice.reducer
```

### Using State and Dispatching Actions (`App.jsx`)
Components use `useSelector` to read data and `useDispatch` to send actions.
```javascript
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from "./redux/cart/cartSlice"

function App() {
  const cart = useSelector(state => state.cart.value)
  const dispatch = useDispatch()

  return (
    <>
      <button onClick={() => { dispatch(addItem("New Item")) }}>add item</button>
      {/* Displaying cart items would go here */}
    </>
  )
}
```