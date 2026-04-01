# Next.js: Route Handlers (API) vs. Server Actions

This document explains the differences between creating standard API routes and using Server Actions in Next.js, based on the patterns found in this project.

## 1. The Two Approaches

### A. Route Handlers (REST API)
*Example location: `next.js/createe-api/app/api/add/route.js`*

This is the traditional way to build HTTP endpoints. You define specific functions for HTTP verbs (GET, POST, PUT, DELETE).

- **Server-side**: You manually parse the request (`request.json()`) and format a response (`NextResponse.json()`).
- **Client-side**: You must use `fetch()` to call the URL, specify the method, headers, and stringify the body.

### B. Server Actions (RPC Pattern)
*Example location: `next.js/server-actions/actions/form.js`*

A modern Next.js feature that allows calling server-side functions directly from client components. It uses a "Remote Procedure Call" (RPC) model.

- **Server-side**: You write an async function marked with `"use server"`.
- **Client-side**: You import the function and call it directly (e.g., in a form's `action` prop). Next.js handles the network transport automatically.

---

## 2. Detailed Comparison

| Feature | Route Handlers (API) | Server Actions |
| :--- | :--- | :--- |
| **Primary Focus** | Public/External Access | Internal App Logic |
| **Communication** | REST / HTTP Requests | Function Calls (RPC) |
| **Boilerplate** | **High**: Manual fetch, JSON, headers. | **Low**: Handled by Next.js. |
| **Form Handling** | Needs `onSubmit` & `e.preventDefault()` | Works natively with `<form action={...}>` |
| **Security** | Requires manual Auth/CSRF logic. | Includes built-in CSRF protection. |
| **External Use** | Can be called by Mobile Apps/CURL. | Intended for internal Next.js use only. |

---

## 3. Decision Matrix: When to use which?

### Use **Server Actions** when:
- **Handling Forms**: Creating, updating, or deleting records via UI forms.
- **Internal Mutations**: Toggling a "Like" button, adding an item to a cart, or deleting a post within the app.
- **Progressive Enhancement**: You want the form to work even if JavaScript is slow or disabled.
- **Type Safety**: You want the client to automatically know the server function's arguments/return types.

### Use **Route Handlers** when:
- **Public APIs**: You want to provide data to 3rd party developers.
- **Mobile Apps**: You have a separate Android/iOS app that needs the same backend.
- **Webhooks**: You need a fixed URL to receive data from services like Stripe, Clerk, or GitHub.
- **File Serving**: You need to generate and return raw files (PDFs, Images, CSVs) directly to the browser.

---

## 4. Summary Recommendation
For most logic inside a Next.js application, **Server Actions** are the preferred choice because they reduce code complexity. Use **Route Handlers** only when you need to expose a stable URL for external clients.
