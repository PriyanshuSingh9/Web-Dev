# Full-Stack Todo App — Checkpoint 03
## Concepts, Architecture, and Mental Models

This checkpoint covers the transition from basic CRUD wiring to **real product-level behavior**:
- unified updates
- inline editing (tasks + lists)
- delete flows with confirmation
- correct data modeling
- frontend–backend responsibility boundaries

---

## 1. High-Level Architecture (End-to-End)

### Data Flow (Single Source of Truth)

UI (React)
→ API call (fetch)
→ Express route
→ Mongoose model
→ MongoDB
→ Response
→ UI re-render (via refetch)

Core principle:
> **MongoDB is the source of truth. React reflects it.**

No domain data is duplicated in frontend state.

---

## 2. MongoDB & Mongoose Concepts Reinforced

### 2.1 Embedded Documents (Tasks)

- Lists embed tasks as subdocuments
- Each task **must have**:
  - `_id`
  - `title`
  - `completed`

Why `_id` matters:
- Required for precise updates and deletes:
  ```js
  "list_tasks._id": taskId
````

Without `_id`, update/delete operations silently fail.

---

### 2.2 Critical Seeding Rule (Learned the Hard Way)

> **Mongoose defaults and `_id`s apply only when data flows through Mongoose**

* Raw Compass JSON inserts bypass schema logic
* Effects:

  * missing `_id` on tasks
  * missing default `completed`
  * broken UI interactions

Correct approaches:

* Seed using Mongoose models (preferred)
* OR manually include `_id` + `completed` in Compass JSON

---

## 3. REST API Design Decisions

### 3.1 Routes in Use

* `POST   /lists` → create list
* `GET    /lists` → fetch lists
* `PATCH  /lists/:listId` → update list (title / description)
* `DELETE /lists/:listId` → delete list
* `POST   /lists/:listId/tasks` → add task
* `PATCH  /lists/:listId/tasks/:taskId` → update task (generic)
* `DELETE /lists/:listId/tasks/:taskId` → delete task

---

### 3.2 Why One Generic PATCH Endpoint

Instead of multiple specialized endpoints, we use:

```json
PATCH /lists/:listId/tasks/:taskId
{
  "title": "New title",        // optional
  "completed": true            // optional
}
```

Key idea:

> **PATCH = partial update**

Send **only what changed**.

This scales cleanly as the model grows.

---

## 4. Correct Partial Update Pattern (Critical Concept)

### The Wrong Pattern

```js
if (!value) { ... }   // ❌ incorrect
```

Reason:

* `false`, `""`, `0` are valid values
* Truthiness ≠ presence

---

### The Correct Pattern

```js
const payload = {};

if (update.title !== undefined) {
  payload.title = update.title;
}

if (update.completed !== undefined) {
  payload.completed = update.completed;
}

if (Object.keys(payload).length === 0) return;
```

Rule to remember:

> **Check for `undefined`, not falsy values**

---

## 5. React State Ownership Model

### 5.1 Who Owns What

| Data           | Owner              |
| -------------- | ------------------ |
| Lists & tasks  | Backend            |
| Editing text   | Local React state  |
| Checkbox state | Derived from props |
| Form inputs    | Local React state  |

Golden rule:

> **If data already exists in props, do NOT store it in state**

---

## 6. Inline Editing — Tasks AND Lists

### 6.1 What Inline Editing Means

* Text → click → input
* Edit locally
* On blur / Enter → PATCH
* Exit edit mode

Used for:

* task titles
* list titles

---

### 6.2 Required UI State (No Hooks in Loops)

We **do not** create state per task or per list.

Instead we track:

* `editingTaskId` / `editingListId`
* `editedTitle`

Why this works:

* Only one entity is edited at a time
* Hooks remain at top-level
* No duplicated domain state

---

### 6.3 Core Conditional Rendering Pattern

```jsx
editingId === entity._id
  ? <input ... />
  : <span ... />
```

Key insight:

> **Inline editing = conditional rendering + temporary UI state + PATCH on exit**

---

## 7. Delete Flows with Confirmation

### 7.1 Why Confirmation Is Necessary

Delete actions are:

* destructive
* irreversible (in current design)

So UX must:

* prevent accidental deletion
* require explicit intent

---

### 7.2 Confirmation Pattern Used

```js
const confirmed = window.confirm("Are you sure?");
if (!confirmed) return;
```

Used for:

* deleting a task
* deleting a list

This ensures:

* no accidental data loss
* simple, native confirmation UX

---

### 7.3 Delete Mental Model

1. User clicks delete
2. Confirmation dialog appears
3. If confirmed:

   * send DELETE request
   * refetch lists
4. UI updates

---

## 8. React Rules Reinforced

### 8.1 Hooks Rules

* ❌ No hooks inside loops
* ❌ No hooks inside conditions
* ❌ No hooks inside nested functions
* ✅ Hooks only at component top level

---

### 8.2 Controlled Components

* Inputs → `value` + `onChange`
* Checkboxes → `checked` + `onChange`
* Never use `value` for checkbox state

---

## 9. Forms & Event Handling Best Practices

* Handle submit on `<form>` with `onSubmit`
* Use `e.preventDefault()`
* Never mutate state directly
* Replace state objects instead of modifying them

---

## 10. Bugs Encountered & Concepts Learned

| Bug                           | Concept Reinforced     |
| ----------------------------- | ---------------------- |
| Missing `_id` in seeded tasks | ORM schema enforcement |
| `!value` checks failing       | Presence vs truthiness |
| Hooks in loops                | React hook rules       |
| Mutating state                | Immutability           |
| Wrong fetch options           | HTTP correctness       |
| Calling function props        | React render semantics |

Each bug strengthened a **core mental model**, not just syntax.

---

## 11. Feature Completeness at This Checkpoint

The app now supports:

* Create list
* Fetch lists
* Inline edit list title
* Delete list (with confirmation)
* Add task
* Inline edit task title
* Toggle task completion
* Delete task (with confirmation)
* Correct backend synchronization
* Schema-safe updates

This is a **complete CRUD application with real UX patterns**.

---

## 12. Key Mental Models to Retain

* Server is the source of truth
* PATCH = merge what I send
* Inline editing ≠ instant backend update
* Data shape bugs > React bugs
* One generic update path > many special ones
* Confirmation is part of UX, not logic

---

## 13. Next Directions (Post-Checkpoint)

Logical next steps:

* Optimistic UI updates (remove refetch)
* Performance refactor (local state merging)
* Undo / keyboard shortcuts
* Accessibility improvements
* Production deployment

---