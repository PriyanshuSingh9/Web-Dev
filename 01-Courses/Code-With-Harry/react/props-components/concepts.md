# Components and Props in React

Components and props are fundamental concepts in React. They allow you to build reusable and modular UI elements.

## Components

Components are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML. There are two types of components:

- **Functional Components:** These are simple JavaScript functions that accept props and return a React element.
- **Class Components:** These are ES6 classes that extend `React.Component` and have a `render()` method.

For a beginner, it's best to focus on functional components, as they are simpler and more modern.

### Example: A Simple Functional Component

```jsx
// Card.jsx
import React from 'react';

function Card() {
  return (
    <div className="card">
      <h2>My Card</h2>
      <p>This is a simple card component.</p>
    </div>
  );
}

export default Card;
```

## Props

Props (short for "properties") are how you pass data from a parent component to a child component. Props are read-only, which means a component cannot change the props it receives.

### Example: Passing Props to a Component

Let's say you want to make the `Card` component more dynamic by passing it a title and description.

```jsx
// App.jsx
import React from 'react';
import Card from './Card';

function App() {
  return (
    <div>
      <Card title="First Card" description="This is the first card." />
      <Card title="Second Card" description="This is the second card." />
    </div>
  );
}

export default App;
```

Now, you can access these props in the `Card` component:

```jsx
// Card.jsx
import React from 'react';

function Card(props) {
  return (
    <div className="card">
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
}

export default Card;
```

In this example, the `App` component passes `title` and `description` props to the `Card` component. The `Card` component then uses these props to render the title and description dynamically.
