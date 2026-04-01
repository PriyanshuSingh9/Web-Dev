# BitLinks: Architectural & Engineering Review
**Prepared by:** Principal Software Engineer  
**Date:** February 14, 2026  

---

## 1. Clean Code & Logic

### Race Conditions: TOCTOU (Time-of-Check to Time-of-Use)
Your current logic checks for an existing slug and then creates a new one. In a multi-user environment, this creates a race condition.
*   **The Problem:** Two requests for the same slug "link1" arrive at the same millisecond. Both pass the `findOne` check. Both attempt to `create`. If the database doesn't have a unique index, you get duplicates. If it does, the second request crashes the server action.
*   **The Fix:** Use atomic operations or "Optimistic Concurrency Control." Rely on the database's unique constraint rather than an application-level check.

```typescript
// ATOMIC APPROACH
async function saveUrl(data) {
    try {
        // Attempt insert directly. Let the DB handle the "check".
        return await Database.insert(data);
    } catch (err) {
        if (err.code === 'DUPLICATE_KEY') {
            throw new DomainError("Slug already taken");
        }
        throw new SystemError("Storage failure");
    }
}
```

### Input Sanitization & Reserved Routes
Slugs are used as URL segments. Your logic allows any string.
*   **The Problem:** If a user chooses "shorten" or "api" as their slug, they could overwrite your application routes or cause routing loops.
*   **The Fix:** Implement a "Deny List" and strict Regex validation for slugs (e.g., `^[a-zA-Z0-9-_]+$`).

---

## 2. Separation of Concerns

### Tightly Coupled Infrastructure
Your "Service" logic is responsible for initiating database connections.
*   **The Problem:** If you want to unit test your logic without a database, you can't because the connection is hardcoded inside the function.
*   **The Fix:** Use a **Singleton Pattern** for the connection (which you've started) but move the invocation to a Middleware or a Global Bootstrapper, not inside every individual action.

### The Repository Pattern
Currently, your business logic knows about Mongoose models.
*   **The Problem:** If you switch from MongoDB to PostgreSQL, you have to rewrite every "action" file in the app.
*   **The Fix:** Create a Repository interface. The action calls `UrlRepo.save()`, and only the Repository knows about Mongoose.

```typescript
// Domain Logic (Action)
async function shortenAction(slug, url) {
    // Validation logic here...
    return await UrlRepository.createMapping(slug, url);
}

// Data Access Layer (Repository)
const UrlRepository = {
    createMapping: (slug, url) => MongooseModel.create({ slug, url })
};
```

---

## 3. Security & Data Integrity

### Validation Asymmetry
You rely on frontend forms for URL validation.
*   **The Problem:** An attacker can bypass your React form and send a POST request via `curl` with a malicious script or an invalid URL format.
*   **The Fix:** **Always validate on the server.** The frontend validation is for UX; the server validation is for Security.

### Error Propagation vs. Information Leakage
*   **The Problem:** Your `catch` blocks often genericize errors.
*   **The Fix:** Implement an Error Hierarchy. Distinguish between errors the user should see (4xx) and internal failures (5xx).

```typescript
// Custom Error Hierarchy
class AppError extends Error { constructor(public code: number, message: string) { super(message); } }
class ConflictError extends AppError { constructor(msg: string) { super(409, msg); } }
```

---

## 4. Scalability & Maintainability

### Read-Heavy Redirection Bottleneck
*   **The Problem:** In a URL shortener, reads (redirects) outnumber writes (shortening) by 100:1. Querying a disk-based DB like MongoDB for every redirect is inefficient.
*   **The Fix:** Implement a **Caching Layer**. Use a Key-Value store (like Redis) to store slug-to-url mappings.
    *   *Flow:* Check Redis -> Found? Redirect. -> Not found? Check DB -> Found? Update Redis & Redirect.

### Configuration Management
*   **The Problem:** Using `process.env` directly in components makes the code brittle and hard to test.
*   **The Fix:** Create a `config.ts` that validates all environment variables at startup and exports a read-only object.

---

## 5. Computer Science Fundamentals to Study

### I. Atomicity and ACID Properties
Understand how databases handle concurrent operations. Studying **Transactions** and **Atomic Writes** will help you build systems that don't corrupt data when multiple users interact with the same resource.

### II. Caching & Latency (The L1/L2 Concept)
Study the "Caching Hierarchy." Understanding why memory (RAM) access is orders of magnitude faster than disk (SSD) access will change how you design read-heavy systems like redirectors and session managers.

### III. System Design: ID Generation (Entropy vs. Determinism)
Look into how "short codes" are generated. Compare **Collision-based generation** (randomly picking a code and checking if it's used) vs. **Deterministic generation** (Base62 encoding a unique integer ID). This is the difference between a system that works for 1,000 links and one that works for 1,000,000,000.
