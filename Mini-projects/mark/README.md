This **Project Market Requirements Document (MRD)** outlines the development of a Google Keep-style multi-list application, integrating a full-stack architecture with modern React patterns and MongoDB persistence.

---

### **1. Project Vision & User Stories**
The objective is to move beyond a single-list application to a **multi-list management system** where users can organise diverse categories of tasks.
*   **Create Multiple Lists:** As a user, I can use a dedicated form to initialise new lists with unique names.
*   **Focused Editing (Frontview):** As a user, I can click any list to bring it into a "frontview" (modal) while the main page remains visible in the background, allowing for undistracted editing.
*   **Full CRUD Logic:** Users must be able to add, read, edit, and delete tasks within both "incomplete" and "complete" categories.
*   **Persistence:** All data is saved to a central database, ensuring access across different sessions.

---

### **2. Technical Architecture**
The application will transition from a "Clean Slate" front-end to a **MERN-influenced architecture**.
*   **Frontend:** Built with **React 19**, utilising functional components as the standard for composability.
*   **Styling:** **Tailwind CSS** for utility-first design, featuring `backdrop-blur` for the background when a list is in frontview.
*   **UI Components:** **Radix UI** or **Shadcn UI** primitives will be used to manage the "frontview" modal logic, ensuring focus is trapped correctly while the modal is active.
*   **Data Fetching:** **TanStack Query** will manage all interactions with the MongoDB backend to prevent "race conditions" and handle loading/error states automatically.

---

### **3. Data Schema (MongoDB)**
Each list document in the MongoDB collection will follow this strict schema to support the multi-list logic:
*   **`id`**: Unique identifier (generated via **UUID** for frontend-side tracking).
*   **`list name`**: String identifier for the specific list.
*   **`incomplete tasks`**: An array of task objects (each with its own ID and text).
*   **`complete tasks`**: An array of task objects that have been toggled as done.

---

### **4. Component Design Patterns**
To manage the complexity of multiple lists and nested tasks, the following React principles will be applied:
*   **Lift Content Up:** The logic for which list is currently in the "frontview" will be lifted to the parent component, which then renders the specific list in a provided slot.
*   **Push State Down:** Individual task interactions (like toggling a checkbox) will have their state managed as close to the UI as possible to avoid unnecessary re-renders of the entire list.
*   **Optimistic UI:** Use the **`useOptimistic` hook** for task edits; this ensures the UI updates immediately when a user modifies a task in the frontview before the database confirmation returns.

---

### **5. Accessibility (A11y) & UX Standards**
*   **ARIA Roles:** The "frontview" must use `role="dialog"` and `aria-modal="true"` to notify assistive technologies that the background content is currently inert.
*   **Focus Management:** The application must handle focus shifts automatically when a list moves to the frontview so keyboard-only users can navigate the modal immediately.
*   **Visual Indicators:** Completed tasks will use the Tailwind `line-through` class for sighted users, while `aria-pressed` or `defaultChecked` attributes will communicate state to screen readers.

---

### **6. Development Milestones**
1.  **Setup:** Initialise React with Vite and install Tailwind, Radix UI, and TanStack Query.
2.  **API Layer:** Create Express routes to handle CRUD operations for the defined MongoDB schema.
3.  **UI Layout:** Build the main dashboard and the "Create List" form using semantic HTML.
4.  **Frontview Logic:** Implement the modal interaction using Radix primitives and apply the "Lift Content Up" pattern.
5.  **Optimisation:** Integrate `useOptimistic` for task edits and perform accessibility audits using Lighthouse.

### **Metaphor for Understanding**
Managing this app is like **running a library with private reading rooms**. The main dashboard is the **library floor**, where you can see all the different **books (Lists)**. When you click a list, it’s like taking that book into a **private room (Frontview)**; the library is still there in the background, but your focus is entirely on the pages in front of you. **TanStack Query** acts as the librarian who ensures that any notes you scribble in the book are perfectly synchronised with the **master archives (MongoDB)**.