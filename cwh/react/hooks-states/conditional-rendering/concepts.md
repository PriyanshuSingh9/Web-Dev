# Conditional Rendering in React

Conditional rendering in React works the same way conditions work in JavaScript. You can use `if` statements, the `&&` operator, or the ternary operator to conditionally render components or elements.

## Using the `&&` Operator

The `&&` operator is a concise way to conditionally render an element. If the condition is true, the element after `&&` will be rendered. If it's false, it will be ignored.

### Example:

```jsx
import React, { useState } from 'react';

function App() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'}
      </button>
      {show && <p>This text is shown conditionally.</p>}
    </div>
  );
}

export default App;
```

In this example, the paragraph is only rendered when `show` is `true`.

## Using the Ternary Operator

The ternary operator is another way to handle conditional rendering. It's useful for inline conditions.

### Example:

```jsx
import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome back!</p>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>
          Log in
        </button>
      )}
    </div>
  );
}

export default App;
```

Here, the component renders a welcome message if `isLoggedIn` is true, and a login button otherwise.
