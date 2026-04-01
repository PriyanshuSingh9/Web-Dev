# Redux & Redux Toolkit Concepts

A comprehensive guide to understanding State Management in this project using **Redux Toolkit (RTK)** and **React-Redux**.

## 1. Why Redux?
Redux is a pattern and library for managing and updating application state, using events called "actions". It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.

### The Problem it Solves
- **Prop Drilling**: Passing data through many layers of components just to reach a deeply nested child.
- **State Synchronization**: Keeping state consistent across different parts of the UI.

## 2. Key Libraries

| Library | Purpose |
| :--- | :--- |
| **react-redux** | Official React bindings. It lets your React components read data from a Redux store, and dispatch actions to the store to update data. |
| **@reduxjs/toolkit** | The official, opinionated, batteries-included toolset for efficient Redux development. It simplifies store setup, reducers, and immutable update logic. |

## 3. Core Principles

1.  **Single Source of Truth**: The state of your whole application is stored in an object tree within a single store.
2.  **State is Read-Only**: The only way to change the state is to emit an action, an object describing what happened.
3.  **Changes are made with Pure Functions**: To specify how the state tree is transformed by actions, you write pure reducers.

## 4. Redux Toolkit Concepts (The Modern Way)

### Store (`configureStore`)
The center of the Redux universe. It holds the application state.
- **Project File**: `src/redux/store.js`
- **Concept**: Created using `configureStore` which automatically sets up the Redux DevTools extension and some middleware (like thunk).

### Slice (`createSlice`)
A "slice" is a collection of Redux reducer logic and actions for a single feature of your app (e.g., `counter`, `user`, `posts`).
- **Project File**: `src/redux/counter/counterSlice.js`
- **What it does**:
    - Generates **Action Creators** automatically based on the reducer names.
    - Generates the **Reducer** function to be used in the store.
    - Uses **Immer** library internally, allowing you to write "mutating" logic (e.g., `state.value += 1`) which is then safely converted to immutable updates.

### Provider
A React component that wraps your application and makes the Redux store available to any nested components that need to access the Redux store.
- **Project File**: `src/main.jsx`

### Hooks
- **`useSelector`**: A hook to extract data (select) from the Redux store state. It subscribes to the store, so the component re-renders when the selected state changes.
- **`useDispatch`**: A hook that returns a reference to the `dispatch` function from the Redux store. You use this to dispatch actions as needed.

## 5. Implementation Walkthrough

### Step 1: Create the Slice
Define the initial state and the functions (reducers) that can modify it.

```javascript
// src/redux/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: state => {
            // RTK uses Immer, so we can write "mutating" logic safely
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        multiply: (state) => {
            state.value *= 2;
        }
    }
})

// Export actions for components to use
export const { increment, decrement, incrementByAmount, multiply } = counterSlice.actions

// Export reducer for the store to use
export default counterSlice.reducer
```

### Step 2: Configure the Store
Add the slice reducer to the store configuration.

```javascript
// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counter/counterSlice"

export default configureStore({
    reducer: {
        counter: counterReducer // "counter" is the key in the global state object
    }
})
```

### Step 3: Provide the Store
Wrap the main app component with `<Provider>`.

```javascript
// src/main.jsx
import store from './redux/store.js'
import { Provider } from "react-redux"

// ... inside render
<Provider store={store}>
    <App />
</Provider>
```

### Step 4: Use State and Actions in Components
Read values and trigger changes.

```javascript
// src/App.jsx
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, multiply } from './redux/counter/counterSlice'

function App() {
  // Read from store: state.counter matches the key in store.js
  const count = useSelector(state => state.counter.value)
  
  // Get dispatch function
  const dispatch = useDispatch()

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      <span> Count is {count} </span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(multiply())}>*</button>
    </div>
  )
}
```

## 6. Data Flow Cycle

1.  **Event**: User clicks "Increment" button in `App.jsx`.
2.  **Dispatch**: `dispatch(increment())` is called.
3.  **Action**: An action object `{ type: 'counter/increment' }` is sent to the store.
4.  **Reducer**: The store runs the `counter` reducer function. It matches the action type and runs the logic `state.value += 1`.
5.  **State Update**: The store updates the global state.
6.  **Re-render**: `App.jsx` (via `useSelector`) detects the change in `state.counter.value` and re-renders with the new number.
