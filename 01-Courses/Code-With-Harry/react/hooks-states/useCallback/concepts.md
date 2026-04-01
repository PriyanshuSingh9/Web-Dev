# Concepts Used

## React Hooks
- **useCallback**: Returns a memoized callback function.
  - "now on changing count navbar isnt re rerendered as the fucntion changeAdjective is freezed or this copy is preserved in all re renders of the app file"
  - "the second param fro useCallback is the same as in useMemo it is the list of states or variables that on change will cause the function to change"

## Core Concepts
- **Memoization (React.memo)**: Higher order component to skip re-rendering if props haven't changed.
  - "on changing count navbar gets re rendered thus to avoid this behaviour we use memo in the navabr component"
  - "now navbar only get re rendered if any of its props are changed"
- **Referential Equality**: Understanding that functions created inside components are new instances on every render, causing child components to re-render even if logic hasn't changed.
  - "but whenver we change count the function change adjective also gets changed i.e. js creates another function by the same name but the functions are not truly the same"

## Implementation Details

### Memoizing the Component (`components/Navbar.jsx`)
Wrapping the component in `memo` ensures it only re-renders when props change.
```javascript
import React, { memo } from 'react'

const Navbar = ({ adjective, changeAdjective }) => {
    console.log("i am navbar")
    return (
        <div>
            I am a {adjective} navbar
            <button onClick={() => changeAdjective()}>Change adjective</button>
        </div>
    )
}

export default memo(Navbar)
```

### Memoizing the Function (`App.jsx`)
Using `useCallback` ensures `changeAdjective` maintains the same reference across renders unless dependencies change.
```javascript
const changeAdjective = useCallback(() => {
    const adjectives = ["happy", "bright", "curious"];
    const rand = Math.floor(Math.random() * adjectives.length);
    setAdjective(adjectives[rand]);
  }, [] // Dependency array: empty means function reference never changes
)
```