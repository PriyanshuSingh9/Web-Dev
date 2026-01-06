# Full-Stack Todo App — Checkpoint 03 
## Concepts, Architecture, and Mental Models

This checkpoint covers the transition from basic CRUD wiring to **real product-level behavior**: inline editing, unified updates, correct data flow, and schema correctness.

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

Key principle:
> **MongoDB is the source of truth. React reflects it.**

We intentionally avoid duplicating domain data in React state.

---

## 2. MongoDB & Mongoose Concepts Learned

### 2.1 Embedded Documents (Tasks inside Lists)

- Lists contain an array of task subdocuments
- Each task **must** have:
  - `_id`
  - `title`
  - `completed`

Why `_id` matters:
- Required to target a specific task:
  ```js
  "list_tasks._id": taskId
  ```
- Without `_id`, updates silently fail

### 2.2 Important Rule About Seeding

> **Mongoose defaults and `_id`s are applied ONLY when data flows through Mongoose**

- Raw Compass inserts bypass schema logic
- Result:
  - missing `_id`
  - missing default values
  - broken frontend behavior

Correct approaches:
- Seed via Mongoose scripts (preferred)
- OR manually include `_id` and `completed` in Compass JSON

---

## 3. REST API Design Decisions

### 3.1 Routes Used

- `POST   /lists` → create list
- `GET    /lists` → fetch all lists
- `POST   /lists/:listId/tasks` → add task
- `PATCH  /lists/:listId/tasks/:taskId` → update task (generic)
- `DELETE /lists/:listId/tasks/:taskId` → delete task

### 3.2 Why One Generic PATCH Endpoint

Instead of:
- `toggleTask`
- `renameTask`
- `markComplete`

We use **one** update endpoint:

```json
PATCH /lists/:listId/tasks/:taskId
{
  "title": "New title",        // optional
  "completed": true            // optional
}
```

Key idea:
> **PATCH = partial update**

Only send what changed.

---

## 4. Correct Partial Update Pattern (Very Important)

### The Mistake to Avoid

```js
if (!value) { ... }   // ❌ wrong
```

Why?
- `false`, `""`, `0` are valid values
- Truthiness ≠ presence

### Correct Pattern

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

## 5. React Architecture & State Ownership

### 5.1 State Lives Where It Belongs

| Type of Data | Owner |
|---|---|
| Lists, tasks | Backend |
| Editing text | React local state |
| Checkbox checked | Derived from props |
| Form inputs | React local state |

Golden rule:
> **If data already exists in props, do NOT put it in state**

---

## 6. Inline Editing — Core Mental Model

### What Inline Editing Actually Is

1. Display mode → text
2. Click → input
3. Edit locally
4. On blur / Enter → PATCH
5. Exit edit mode

### Required UI State

We **do not** create state per task.

Instead, we track:
- `editingTaskId` → which task is being edited
- `editedTitle` → temporary text

Why?
- Hooks cannot be used inside loops
- Only one task is edited at a time
- Simpler, safer, scalable

### Conditional Rendering Pattern

```jsx
editingTaskId === task._id
  ? <input ... />
  : <span ... />
```

Key idea:
> **Inline editing = conditional rendering + temporary UI state + PATCH on exit**

---

## 7. React Rules Reinforced

### 7.1 Hooks Rules

- ❌ No hooks inside loops
- ❌ No hooks inside conditions
- ❌ No hooks inside nested functions
- ✅ Hooks only at top level of components

### 7.2 Controlled Components

- Inputs must use `value` + `onChange`
- Checkboxes use `checked`, not `value`

---

## 8. Forms & Event Handling

### Correct Form Submission Pattern

- Handle submission on `<form>`
- Use `onSubmit`
- Call `e.preventDefault()`

Avoid:
- handling submit logic on button `onClick`
- mutating state directly

---

## 9. Common Bugs Identified & Fixed

- Wrong prop destructuring (`props` vs `{ prop }`)
- Calling function props instead of passing them
- Using `header` instead of `headers` in fetch
- Using `:` in frontend URLs
- Mutating state directly
- Missing `_id` in seeded subdocuments
- Treating `false` as “missing”

Each bug reinforced a **core principle**, not just syntax.

---

## 10. What This Checkpoint Achieves

At this point, the app supports:

- Create list
- Fetch lists
- Add task
- Update task (title + completion)
- Inline task title editing
- Proper checkbox handling
- Correct backend sync
- Schema-safe data model

This is a **complete, non-trivial CRUD application** with real UX patterns.

---

## 11. Key Mental Models to Keep

- Server is the source of truth
- PATCH means “merge what I send”
- Inline editing ≠ instant backend updates
- Data shape bugs > React bugs
- One generic update path > many specific ones

---

## Next Directions (Post-Checkpoint)

Natural next steps:
- Inline edit list title
- Delete list / task with confirmation
- Optimistic UI updates
- Performance refactor (no refetch)
- Undo / keyboard shortcuts

---