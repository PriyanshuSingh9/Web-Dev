# Lesson 1: Installation & Setup

We are using **Auth.js v5** (beta) for authentication. It's the standard for Next.js 15 applications.

## Goal
Install the necessary package and define your environment secret.

## Instructions

1.  **Install the Library:**
    Run the following command in your terminal to install the beta version of NextAuth (required for Next.js App Router support).
    ```bash
    npm install next-auth@beta
    ```

2.  **Generate a Secret:**
    Auth.js requires a secret key to encrypt sessions. You can generate one using `openssl`.
    ```bash
    npx auth secret
    ```
    *This will automatically add an `AUTH_SECRET` to your `.env.local` file (or create it if it doesn't exist).*

3.  **Verify:**
    *   Check `package.json` to ensure `next-auth` is listed in dependencies.
    *   Check `.env.local` to confirm `AUTH_SECRET` is present.

## Your Task
Execute the commands above. Once done, tell me "Task 1 Complete" and I will check your work before we move to Lesson 2 (Configuration).
