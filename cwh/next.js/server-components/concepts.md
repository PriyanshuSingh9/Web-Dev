# Next.js Concepts: Server vs. Client Components

This document serves as a guide for understanding the core architectural concepts in Next.js (App Router), specifically focusing on the distinction between Server and Client Components.

## 1. Server Components (The Default)

In the Next.js App Router (`app/` directory), **every component is a Server Component by default**.

### Key Characteristics:
*   **Render on the Server:** The HTML is generated on the server and sent to the client. The JavaScript logic for the component itself is *not* sent to the browser, reducing the bundle size.
*   **Direct Backend Access:** They can directly access your database, file system, or internal microservices securely.
*   **Async/Await:** They can be `async` functions, allowing you to `await` data fetching directly in the component body.

### Limitations:
*   ❌ Cannot use React Hooks (`useState`, `useEffect`, `useContext`, `useReducer`, etc.).
*   ❌ Cannot use browser-only APIs (`window`, `document`, `localStorage`) or Event Listeners (`onClick`, `onChange`).

### When to Use:
*   Fetching data (DB queries, API calls).
*   Keeping sensitive information (API keys, tokens) secure on the server.
*   Rendering static content that doesn't require user interaction.

### Example (`app/page.js`):
```javascript
// This is a Server Component by default.
export default function Home() {
  console.log("I run on the server!"); // Logs in the Terminal, not Browser Console.
  
  // Direct DB calls are safe here.
  // const data = await db.query(); 

  return <div>Static Content</div>;
}
```

---

## 2. Client Components

Client Components are opted-in using the `"use client"` directive at the very top of the file. They allow you to add client-side interactivity to your application.

### Key Characteristics:
*   **Hydration:** They are pre-rendered on the server (generating initial HTML) and then "hydrated" in the browser to become interactive.
*   **Browser Access:** They have full access to browser APIs and React Hooks.

### When to Use:
*   ✅ Using React Hooks (`useState`, `useEffect`).
*   ✅ Adding Event Listeners (`onClick`, `onChange`, `onSubmit`).
*   ✅ Using browser APIs (`localStorage`, `window.location`).
*   ✅ Using Class Components (rare in modern React, but supported).

### Example (`components/Navbar.jsx`):
```javascript
"use client"; // <--- This directive is mandatory

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      Toggle Menu
    </button>
  );
}
```

---

## 3. The "Leaf" Pattern (Best Practice)

You cannot import a Server Component *into* a Client Component. However, you can pass Server Components as `children` (props) to Client Components.

Conversely, **Server Components can import and render Client Components**. This allows you to keep the majority of your page logic on the server and only push interaction to the "leaves" of your component tree.

### In this Project:
*   `app/page.js` (Server Component) acts as the container.
*   It imports `Navbar` (Client Component) to handle any potential interactivity or state required by the navigation.

This structure ensures that:
1.  Sensitive data stays on the server (`page.js`).
2.  Heavy JavaScript bundles are minimized (only `Navbar` code is sent to the client).
3.  The user gets a fast initial load (Server Side Rendering) followed by interactivity (Hydration).

## Summary Table

| Feature | Server Component | Client Component |
| :--- | :--- | :--- |
| **Default?** | Yes | No (requires `"use client"`) |
| **Render Environment** | Server only | Server (initial) + Client |
| **Hooks (`useState`)** | ❌ No | ✅ Yes |
| **Event Listeners** | ❌ No | ✅ Yes |
| **Access Database** | ✅ Yes (Secure) | ❌ No (Unsafe) |
| **Console Logs** | Terminal | Browser Console |
