# Event Handling in React

Event handling in React is similar to handling events on DOM elements, but with some syntactic differences. Here's a quick rundown for a beginner:

## onClick Handler

The `onClick` handler is one of the most common event handlers. You can use it to trigger a function when an element is clicked.

### Example:

Here's a simple example of an `onClick` handler on a button:

```jsx
import React from 'react';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}

export default App;
```

In this example, when the button is clicked, the `handleClick` function is called, and an alert pops up.

## Passing Arguments to Event Handlers

Sometimes you need to pass arguments to your event handler function. You can do this using an arrow function.

### Example:

```jsx
import React from 'react';

function App() {
  const handleClick = (message) => {
    alert(message);
  };

  return (
    <button onClick={() => handleClick('Hello from the button!')}>
      Click me
    </button>
  );
}

export default App;
```

In this case, clicking the button calls the arrow function, which in turn calls `handleClick` with the specified message.
