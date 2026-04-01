# `useState` Hook in React

The `useState` hook is the most basic and essential hook in React. It allows you to add state to functional components.

## Basic Usage

To use `useState`, you call it with an initial value. It returns an array with two elements: the current state value and a function to update it.

```jsx
const [state, setState] = useState(initialValue);
```

### Example: A Simple Counter

Here's a classic counter example to illustrate how `useState` works:

```jsx
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default App;
```

In this example:
- We initialize a state variable called `count` with a value of `0`.
- `useState(0)` returns `[count, setCount]`. `count` is the current value, and `setCount` is the function to update it.
- When the button is clicked, we call `setCount(count + 1)` to increment the value of `count`. React then re-renders the component with the new state.

## Updating State

When you call the state-setting function (`setCount` in the example), React schedules an update. It will re-render the component with the new state value.

It's important to not modify the state directly. Always use the setter function provided by `useState`.

**Incorrect:**
```jsx
// This is wrong!
count = count + 1;
```

**Correct:**
```jsx
setCount(count + 1);
```
