# Project Evaluation

This document evaluates the current state of the project against the requirements outlined in the `README.md`.

## Things Done

*   **Multi-list Management:** The application supports the creation and deletion of multiple lists.
*   **Full CRUD Logic:** The backend provides complete CRUD (Create, Read, Update, Delete) operations for both lists and tasks within lists.
*   **Persistence:** All data is persisted in a MongoDB database.
*   **Basic Frontend:** A functional React frontend is in place to interact with the backend API.
*   **Component-Based Architecture:** The frontend is structured into components (`Navbar`, `Sidebar`, `ListCard`).

## Things to be Done Better

*   **Data Fetching Strategy:** The current implementation re-fetches all lists from the server after every single action (add, update, delete). This is inefficient and leads to a poor user experience. Using a library like **TanStack Query** as planned would manage caching, reduce network requests, and handle loading/error states more gracefully.
*   **State Management:** While state is lifted to the `App` component, the "frontview" concept is not realized. State management for the modal and the currently selected list should be implemented.
*   **Styling:** The project uses plain CSS instead of **Tailwind CSS**. Migrating to Tailwind would align with the project goals and allow for more rapid and consistent UI development.
*   **Data Schema:** The current MongoDB schema uses a single array for tasks with a `completed` flag. The `README.md` specified separate `incomplete tasks` and `complete tasks` arrays. The current schema is simpler and arguably more efficient, but it deviates from the plan. This discrepancy should be resolved: either update the `README.md` to reflect the current implementation or refactor the backend to match the `README.md`.

## Improvements to be Made

*   **Optimistic UI:** To improve the user experience, the **`useOptimistic` hook** should be used for task updates. This will make the UI feel faster by updating it immediately, before the server response is received.
*   **Accessibility (A11y):** Once the "frontview" modal is implemented, it must be made accessible by using appropriate ARIA roles (`role="dialog"`, `aria-modal="true"`) and managing focus correctly.
*   **Code Quality:** The frontend code could be improved by separating concerns more clearly. For example, the data fetching logic could be extracted into custom hooks.

## Not Implemented / Left Out

*   **TanStack Query:** Data fetching is done with the native `fetch` API, not TanStack Query.
*   **`useOptimistic` hook:** Optimistic UI updates are not implemented.
*   **Accessibility for Modal:** Since there is no modal, the specified accessibility features are not implemented.
