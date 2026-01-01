To recreate the **TodoList App** (internally named **iTask**) from the sources, you should follow this structured project breakdown. This guide draws on the "Sigma Web Development Course" to help you build a functional, responsive, and persistent application.

### **1. Project Overview & Features**
The goal is to create a **minimalist task planner** that allows users to manage daily activities with the following features:
*   **CRUD Operations:** Add, Read, Edit, and Delete tasks.
*   **Task Completion:** Toggle tasks as "done" with a strike-through visual effect.
*   **Persistence:** All data is saved to **Local Storage**, so tasks remain even after a browser refresh or restart.
*   **Filtering:** A toggle to show or hide tasks that have already been completed.
*   **Responsiveness:** A layout that adapts seamlessly from mobile screens to desktop monitors.
*   **Input Validation:** The "Save" button is disabled unless the task description is longer than 3 characters.

---

### **2. Tech Stack**
*   **Framework:** React (built using the Vite build tool).
*   **Styling:** Tailwind CSS for rapid, utility-first UI design.
*   **Icons:** React Icons (specifically `FaEdit` and `MdDelete`).
*   **Unique IDs:** `uuid` package to ensure every task has a distinct identifier.

---

### **3. Setup and Installation**
To start the project, follow these command-line steps:
1.  **Initialise Project:** Run `npm create vite@latest` and follow the prompts to select **React** and **JavaScript**.
2.  **Install Tailwind CSS:** Execute `npm install -D tailwindcss postcss autoprefixer` and then `npx tailwindcss init -p` to generate the configuration files.
3.  **Configure Tailwind:** Update the `content` array in `tailwind.config.js` to include your source files and add the `@tailwind` directives to your `index.css`.
4.  **Install Dependencies:** Run `npm install uuid react-icons` to add the necessary functional and visual libraries.

---

### **4. Core Component Logic**
The application relies on several key functions to manage its state (stored in a `todos` array and a single `todo` string):

*   **Handling Inputs:** Use an `onChange` handler to update the `todo` state as the user types.
*   **Adding Tasks:** When "Save" is clicked, create a task object containing `{id: uuidv4(), todo, isCompleted: false}` and append it to the `todos` array.
*   **Toggling Completion:** The `handleCheckbox` function finds the task by its ID and flips its `isCompleted` boolean. **Note:** You must create a new copy of the array (e.g., `let newTodos = [...todos]`) to trigger a re-render in React.
*   **Editing:** To edit, the app takes the text of an existing task, moves it back into the input field for modification, and removes the old task from the list.
*   **Persistence (Local Storage):** 
    *   Use a `useEffect` hook that runs once on mount to retrieve stored tasks using `JSON.parse(localStorage.getItem("todos"))`.
    *   Create a helper function, `saveToLS`, to save the current state to local storage whenever a task is added, edited, or deleted.

---

### **5. UI and Styling Highlights**
*   **Layout:** Use a central container with `mx-auto` and a violet-themed background for a clean "Card" look.
*   **Navigation:** A simple Navbar with a logo and hover effects on links.
*   **Task Display:** Use `.map()` to render tasks. For completed tasks, conditionally apply the Tailwind class `line-through`.
*   **Mobile Optimisation:** Use responsive prefixes like `md:w-1/2` for desktops while defaulting to `w-full` for mobile devices to ensure the app looks good on all screens.

### **Metaphor for Understanding**
Building this app is like **organising a physical corkboard**. The **React State** is the board itself, the **UUIDs** are the unique pins holding each note, and **Local Storage** is like taking a photograph of the board every time you move a pin, so you can perfectly recreate it the next morning.