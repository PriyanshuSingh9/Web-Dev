# Concepts Used

## React Hooks
- **useContext**: Accepts a context object and returns the current context value.
- **useState**: Manages local state (count) which is then shared via context.

## Core Concepts
- **createContext**: Creates a Context object to share values like state across the component tree without passing props down manually at every level.
- **Context.Provider**: Wraps components to provide them with access to the context value.

## Implementation Details

### Creating Context (`context/context.js`)
```javascript
import { createContext } from "react";

export const counterContext = createContext(0)
```

### Providing Context (`App.jsx`)
The state `count` and its updater `setCount` are passed to the Provider.
```javascript
import { counterContext } from './context/context'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <counterContext.Provider value={{ count, setCount }}>
      <Navbar /> {/* Navbar contains Button */}
      <div className="counter">Current count: {count}</div>
    </counterContext.Provider>
  )
}
```

### Consuming Context (`components/Button.jsx`)
The `Button` component accesses `setCount` directly without prop drilling.
```javascript
import React, { useContext } from 'react'
import { counterContext } from '../context/context'

const Button = () => {
  const value = useContext(counterContext);

  return (
    <button onClick={() => value.setCount(value.count + 1)}>
      Button
    </button>
  )
}
```