# Lesson 2: Configuration & The Handler

Now that Auth.js is installed, we need to tell Next.js how to use it. In v5, we split the logic into two parts: a **Configuration file** (where you define providers) and a **Route Handler** (where Next.js listens for login requests).

## Goal
Set up the core Auth.js files and prepare for GitHub login.

## Instructions

1.  **Create the Base Config (`auth.ts`):**
    Create a file named `auth.ts` in your **root directory** (where `package.json` is). 
    *   **Why?** This file exports the `auth`, `signIn`, and `signOut` functions that you'll use everywhere in your app.
    *   **Snippet to add:** You'll need to import `NextAuth` and define a basic configuration with an empty `providers` array for now.

2.  **Create the API Handler:**
    Auth.js needs an endpoint to handle the OAuth flow.
    Create the following directory structure: `app/api/auth/[...nextauth]/`
    Inside that folder, create a file named `route.ts`.
    *   **What it does:** This file exports the `GET` and `POST` handlers from your `auth.ts` file.

3.  **The "auth.ts" content:**
    In your `auth.ts`, use this structure:
    ```typescript
    import NextAuth from "next-auth"
    import GitHub from "next-auth/providers/github"

    export const { handlers, auth, signIn, signOut } = NextAuth({
      providers: [GitHub],
    })
    ```

4.  **The "route.ts" content:**
    In `app/api/auth/[...nextauth]/route.ts`:
    ```typescript
    import { handlers } from "@/auth"
    export const { GET, POST } = handlers
    ```

## Your Task
1.  Create `auth.ts` in the root.
2.  Create `app/api/auth/[...nextauth]/route.ts`.
3.  Ensure the imports work (note the `@/auth` alias in the route handler).

**Check:** Once you've created these, try to run `npm run dev` and see if there are any immediate build errors.

When ready, tell me "Task 2 Complete".
