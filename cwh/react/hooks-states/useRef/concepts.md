# `useRef` Hook in React

The `useRef` hook is a way to access and interact with DOM elements directly. It can also be used to store a mutable value that does not cause a re-render when it changes.

## Accessing DOM Elements

The most common use case for `useRef` is to get a reference to a DOM element.

### Example:

Let's say you want to focus an input field when a button is clicked.

```jsx
import React, { useRef } from 'react';

function App() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>
        Focus the input
      </button>
    </div>
  );
}

export default App;
```

In this example, we create a ref called `inputRef` and attach it to the input element. When the button is clicked, we can access the input element through `inputRef.current` and call its `focus()` method.

## Storing Mutable Values

You can also use `useRef` to store a value that persists across renders without causing a re-render.

### Example:

```jsx
import React, { useRef, useEffect } from 'react';

function App() {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  return (
    <div>
      <p>This component has rendered {renderCount.current} times.</p>
    </div>
  );
}

export default App;
```

In this case, `renderCount.current` is incremented on every render, but updating it doesn't trigger a new render.
