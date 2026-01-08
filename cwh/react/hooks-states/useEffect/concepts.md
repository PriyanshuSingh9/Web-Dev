# `useEffect` Hook in React

The `useEffect` hook lets you perform side effects in functional components. Side effects are actions that interact with the outside world, like fetching data, subscribing to a service, or manually changing the DOM.

## Basic Usage

The `useEffect` hook takes two arguments: a function to run and a dependency array.

```jsx
useEffect(() => {
  // Your side effect logic here
}, [dependencies]);
```

- The function will run after every render if the dependency array is not provided.
- If the dependency array is empty (`[]`), the function will run only once, after the initial render.
- If the dependency array contains variables, the function will run whenever any of those variables change.

## Example: Fetching Data

A common use case for `useEffect` is fetching data from an API.

```jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}

export default App;
```

In this example, the `useEffect` hook fetches data when the component mounts and updates the state with the fetched data.

## Cleanup Function

The function passed to `useEffect` can return a cleanup function. This is useful for unsubscribing from services or cleaning up resources to prevent memory leaks.

### Example:

```jsx
useEffect(() => {
  const subscription = someService.subscribe();

  return () => {
    // Cleanup: unsubscribe when the component unmounts
    subscription.unsubscribe();
  };
}, []);
```
