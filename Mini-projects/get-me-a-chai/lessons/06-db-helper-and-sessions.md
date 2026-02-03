# Lesson 6: Database Helpers & Session Access

Excellent work! Your user is now persisted in MongoDB. However, connecting to the database directly inside the callback is a bit messy and can lead to performance issues or "Too many connections" errors.

## Goal
Create a reusable database connection helper and learn how to access the logged-in user's session in your UI.

## Instructions

1.  **Create the DB Helper:**
    Create a folder named `lib` in your root directory.
    Inside `lib`, create a file named `db.ts`.
    *   **What it does:** It checks if Mongoose is already connected before trying to connect again. This is essential for Next.js "Hot Reloading" and serverless environments.
    *   **Snippet:**
    ```typescript
    import mongoose from "mongoose";

    const connectDB = async () => {
      if (mongoose.connections[0].readyState) return;
      try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("MongoDB Connected");
      } catch (error) {
        console.error("Error connecting to MongoDB:", error);
      }
    };

    export default connectDB;
    ```

2.  **Refactor `auth.ts`:**
    Update `auth.ts` to use this new helper instead of the inline `mongoose.connect`.

3.  **Accessing the Session (Server-Side):**
    Open `components/Navbar.tsx`. We want to show "Logout" if the user is logged in, and "Login" if they aren't.
    In Next.js 15 (App Router), you can get the session on the server like this:
    ```tsx
    import { auth } from "@/auth"

    const Navbar = async () => {
      const session = await auth()
      // session.user will contain the logged-in user's data
      ...
    }
    ```

4.  **The Sign Out Button:**
    Since `Navbar` will likely be a Server Component (for SEO and speed), you can use a **Server Action** for the Sign Out button just like you did for Login.
    ```tsx
    import { signOut } from "@/auth"
    ...
    <form action={async () => {
      "use server"
      await signOut()
    }}>
      <button type="submit">Logout</button>
    </form>
    ```

## Your Task
1.  Create `lib/db.ts` and refactor `auth.ts` to use it.
2.  Update `components/Navbar.tsx` to:
    *   Display the user's name or image if logged in.
    *   Show a "Logout" button that works.
    *   Show a "Login" link if they are logged out.

**Check:** After logging in, does the Navbar update to show your name/logout?

When ready, tell me "Task 6 Complete".
