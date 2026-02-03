# Lesson 4: The Login UI & Triggering Auth

Now that the backend knows about GitHub, we need a button on the frontend to trigger the login flow.

## Goal
Implement a "Login with GitHub" button and handle the authentication trigger.

## Concepts
In Auth.js v5, you have two main ways to trigger `signIn`:
1.  **Client-side:** Using the `signIn` function from `next-auth/react`. (Requires `"use client"`).
2.  **Server-side:** Using a form with a **Server Action** and the `signIn` function from your root `auth.ts`. (Recommended for better performance).

## Instructions

1.  **Refactor the Login Page:**
    Open `app/(auth)/login/page.tsx`. We want to add a button that allows the user to log in.

2.  **Implementation (Server Action Approach):**
    This is the cleanest way. You wrap your button in a `<form>` and use the `action` attribute.
    
    *   **Import:** `import { signIn } from "@/auth"`
    *   **Logic:**
        ```tsx
        <form
          action={async () => {
            "use server"
            await signIn("github")
          }}
        >
          <button type="submit">
            Continue with GitHub
          </button>
        </form>
        ```

3.  **Styling (Tailwind):**
    Make it look good! You've already used some nice gradients on the landing page. Try to keep the style consistent. Use a GitHub icon if you have one, or just plain text for now.

4.  **Verification:**
    Once you save the file, go to `http://localhost:3000/login` and click the button. It should redirect you to GitHub's authorization page.

## Your Task
1.  Update `app/(auth)/login/page.tsx` with a functional "Sign in with GitHub" button.
2.  Test the flow. You should be redirected to GitHub and then back to your app.
3.  Once you successfully log in (and redirected back), tell me "Task 4 Complete".

**Note:** If you get a "Module not found" error for `@/auth`, ensure your `tsconfig.json` paths are correct (which they should be from previous steps).
