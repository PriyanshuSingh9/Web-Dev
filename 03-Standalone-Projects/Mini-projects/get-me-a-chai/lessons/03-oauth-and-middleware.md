# Lesson 3: OAuth Credentials & Middleware

Great job on the configuration! Now we need to connect your app to GitHub so users can actually log in.

## Goal
Register a GitHub OAuth application and protect your routes using Middleware.

## Instructions

1.  **Register a GitHub OAuth App:**
    *   Go to your [GitHub Settings > Developer Settings > OAuth Apps](https://github.com/settings/developers).
    *   Click **New OAuth App**.
    *   **Application Name:** `Get Me A Chai (Local)`
    *   **Homepage URL:** `http://localhost:3000`
    *   **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
    *   Click **Register Application**.

2.  **Add Credentials to `.env.local`:**
    *   Copy the **Client ID**.
    *   Generate a **Client Secret** and copy it.
    *   Add them to your `.env.local` file:
        ```env
        AUTH_GITHUB_ID=your_client_id
        AUTH_GITHUB_SECRET=your_client_secret
        ```

3.  **Fix the Middleware Filename:**
    You created `middlewares.ts`. Next.js specifically looks for a file named **`middleware.ts`** (singular) in the root or `src` directory to intercept requests.
    *   **Action:** Rename `middlewares.ts` to `middleware.ts`.

4.  **Configure Middleware:**
    Ensure your `middleware.ts` is correctly exporting the auth logic. The snippet you have is correct, but the filename must be exact.
    ```typescript
    export { auth as middleware } from "@/auth"
    ```

## Your Task
1.  Set up the GitHub OAuth App and update your `.env.local`.
2.  Rename `middlewares.ts` to `middleware.ts`.
3.  Once the environment variables are in place, tell me "Task 3 Complete".

**Assessment Tip:** Without the correct callback URL (`/api/auth/callback/github`), the login will fail with a "redirect_uri_mismatch" error. Double-check that URL!
