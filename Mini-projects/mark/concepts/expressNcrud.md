# Backend Checkpoint 2 — Lists & Tasks API (MongoDB + Express)

## Scope of this Checkpoint
This checkpoint covers the transition from:
- isolated MongoDB schema design  
to
- a fully working, tested REST API for lists and tasks  
validated end-to-end using Postman.

No frontend integration yet — backend correctness first.

---

## 1. Data Modeling Decisions (MongoDB)

### 1.1 List–Task Relationship
We chose **embedded documents** for tasks inside a list.

```js
List {
  _id,
  list_name,
  list_desc,
  list_tasks: [Task]
}
````

```js
Task {
  _id,
  title,
  completed
}
```

### Why embedding?

* Single-user app
* Tasks are meaningless without a list
* Atomic updates (`$push`, `$pull`, `$set`)
* No joins
* Easy deletion (delete list → tasks auto-deleted)

This is the **correct choice** for the current constraints.

---

## 2. Mongoose Schemas

### Task Schema

```js
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
});
```

### List Schema

```js
const listSchema = new mongoose.Schema(
  {
    list_name: { type: String, required: true },
    list_desc: String,
    list_tasks: [taskSchema]
  },
  { timestamps: true }
);
```

Key learnings:

* `_id` is auto-generated for subdocuments
* `required: false` is unnecessary (fields are optional by default)
* Embedded documents can be updated by `_id`

---

## 3. Express Server Setup

### server.js Responsibilities

* Create Express app
* Register middleware
* Mount routes
* Connect MongoDB
* Start server

### Critical Middleware Bug (Fixed)

❌ Incorrect:

```js
app.use(express.json)
```

✅ Correct:

```js
app.use(express.json());
```

**Lesson:**
Middleware must be **executed**, not passed as a reference.
This bug caused Postman requests to hang with “no response”.

---

## 4. Routing Architecture

### Route Mounting

```js
app.use("/lists", listRoutes);
```

### list.routes.js

```txt
POST    /lists
GET     /lists
DELETE  /lists/:listId

POST    /lists/:listId/tasks
PATCH   /lists/:listId/tasks/:taskId
DELETE  /lists/:listId/tasks/:taskId
```

Key learning:

* Routes define URL shape
* Controllers define behavior
* `server.js` connects everything

---

## 5. Controllers (Core Logic)

### 5.1 Create List

```js
POST /lists
```

* Uses `List.create()`
* Returns the created list
* Status code: `201 Created`

Lesson:

* Frontend needs `_id`, not just a message
* REST semantics matter

---

### 5.2 Fetch Lists

```js
GET /lists
```

❌ Initial bug:

```js
res.json({ message: "Lists fetched successfully" })
```

✅ Fixed:

```js
res.json(lists)
```

Lesson:

* GET endpoints must return data, not status messages
* Console logs are not API responses

---

### 5.3 Delete List

```js
DELETE /lists/:listId
```

```js
List.deleteOne({ _id: listId })
```

* Deletes entire document
* Automatically deletes embedded tasks
* Returns `404` if list not found

Lesson:

* Embedded data simplifies cascading deletes

---

## 6. Task CRUD (Embedded Documents)

### 6.1 Add Task

```js
POST /lists/:listId/tasks
```

MongoDB operator:

```js
$push
```

```js
$push: {
  list_tasks: {
    title,
    completed: false
  }
}
```

Lesson:

* No loops
* No fetch–modify–save
* Atomic operation

---

### 6.2 Delete Task

```js
DELETE /lists/:listId/tasks/:taskId
```

MongoDB operator:

```js
$pull
```

```js
$pull: {
  list_tasks: { _id: taskId }
}
```

Lesson:

* `$pull` operates inside arrays
* Do not use `deleteOne` for subdocuments

---

### 6.3 Update Task (Most Complex)

```js
PATCH /lists/:listId/tasks/:taskId
```

Technique:

* Positional operator `$`
* Dynamic `$set` object

```js
{
  _id: listId,
  "list_tasks._id": taskId
}
```

```js
$set: {
  "list_tasks.$.title": "...",
  "list_tasks.$.completed": true
}
```

Key lessons:

* MongoDB targets the correct array element automatically
* No loops
* No race conditions
* Partial updates are safe

Added guard:

```js
if (Object.keys(setObject).length === 0) {
  return res.status(400).json({ message: "No fields provided to update" });
}
```

---

## 7. Postman Testing Workflow

### Why Postman?

* Simulates frontend requests
* Validates backend correctness
* Forces exact URL + body matching

### Learned Debugging Strategy

When Postman shows “no response”:

1. Check server logs
2. Verify middleware
3. Add controller logs
4. Test with `curl`
5. Add `/ping` endpoint if needed

Lesson:

* DB state is the source of truth
* Postman success ≠ correct backend

---

## 8. Common Mistakes Encountered & Fixed

* Missing `express.json()` parentheses
* Wrong route URL (missing `/lists`)
* Sending wrong request body fields
* Forgetting to restart server
* GET endpoint returning message instead of data

Each mistake reinforced:

> **Backend bugs are usually wiring issues, not logic issues**

---

## 9. Current Backend Capabilities (End of Checkpoint)

The backend now supports:

```
✔ Create list
✔ Fetch lists
✔ Delete list

✔ Add task
✔ Update task
✔ Delete task
```

All endpoints:

* Tested via Postman
* Verified against MongoDB state
* Stable and frontend-ready

---

## 10. What This Checkpoint Achieved

By the end of this checkpoint, we can:

* Design MongoDB schemas intentionally
* Use atomic MongoDB operators correctly
* Build REST APIs with proper semantics
* Debug Express servers systematically
* Trust backend behavior under real requests

This marks the transition from **learning backend concepts** to **building a real backend**.

---

## Next Checkpoint (Planned)

**Frontend Integration (React):**

* Fetch lists on app load
* Create lists from UI
* Render lists
* Wire tasks to UI interactions

Backend is now complete for v1.

```

---