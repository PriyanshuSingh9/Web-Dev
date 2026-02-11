# Lesson 7: The Dashboard & Server Actions

Now that users can log in, they need a place to manage their profile and, most importantly, set their Razorpay credentials so they can receive money.

## Goal
Create a protected Dashboard page where users can update their profile details and payment keys.

## Concepts
*   **Protected Routes:** Using `auth()` to check if a user is logged in, and redirecting if not.
*   **Server Actions:** Functions that run on the server, callable directly from your frontend forms. We will use them to update the database.

## Instructions

1.  **Create the Dashboard Page:**
    Create `app/dashboard/page.tsx`.
    *   **Check Auth:** First line inside the component should act as a gatekeeper:
        ```tsx
        const session = await auth()
        if (!session) redirect("/login")
        ```
    *   **Fetch Data:** Fetch the current user's data from MongoDB so you can pre-fill the form inputs.
        ```tsx
        await connectDB()
        const user = await User.findOne({ email: session.user.email })
        ```

2.  **Create the Server Action:**
    Create a new file `actions/useractions.ts`.
    *   Define an async function `updateProfile` that takes `formData`.
    *   **Crucial:** Add `"use server"` at the top of the function or file.
    *   **Logic:**
        1.  Get data from `formData`.
        2.  Connect to DB.
        3.  `User.updateOne(...)` based on the email.
        4.  `revalidatePath('/dashboard')` to refresh the UI.

3.  **Build the Form:**
    In `app/dashboard/page.tsx`, create a form that points to your server action.
    *   Inputs needed: `name`, `username`, `image`, `coverImage`, `cashfreeClientId`, `cashfreeClientSecret`.
    *   Use `defaultValue={user.name}` etc., to show existing data.

## Your Task
1.  Create `actions/useractions.ts` and implement `updateProfile`.
2.  Create `app/dashboard/page.tsx` with the protection logic and the form.
3.  **Test:** Log in, go to `/dashboard`, change your username or Razorpay ID, and save. Refresh to ensure it stuck.

**Assessment:** I'll check if your Server Action is secure (verifying session inside the action too!) and if the form correctly updates the database.
