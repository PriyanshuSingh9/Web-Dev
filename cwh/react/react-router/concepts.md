# React Router

React Router is a standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.

## Basic Routing Setup

To get started with React Router, you need to install it first:

```bash
npm install react-router-dom
```

Then, you can set up your routes in your main application file.

### Example:

```jsx
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

In this example, we define three routes: `/`, `/about`, and `/contact`. The `App` component acts as a layout, and the `Home`, `About`, and `Contact` components are rendered as children depending on the URL.

## `Link` Component

The `Link` component is used to create links between your routes. It's similar to the `<a>` tag in HTML, but it's aware of the router and prevents the page from reloading.

### Example:

```jsx
// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
```

## `useParams` Hook

The `useParams` hook allows you to access URL parameters from the current route.

### Example:

Let's say you have a route for a user profile, like `/user/:username`.

```jsx
// In your router setup
{
  path: 'user/:username',
  element: <User />,
}
```

Then, in your `User` component, you can access the `username` parameter:

```jsx
// User.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function User() {
  const { username } = useParams();

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {username}</p>
    </div>
  );
}

export default User;
```

If you navigate to `/user/johndoe`, the `User` component will render "Username: johndoe".
