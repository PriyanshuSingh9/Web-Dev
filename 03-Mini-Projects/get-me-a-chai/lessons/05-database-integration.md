# Lesson 5: Database Integration (The Callback)

You've successfully connected GitHub! However, right now, the user logs in and Auth.js just gives them a session. It doesn't save anything to your MongoDB database yet.

## Goal
Automatically create or update a user in MongoDB upon successful login using Auth.js **Callbacks**.

## Concepts
**Callbacks** are functions that happen at specific moments in the auth lifecycle.
We will use the `signIn` callback. It runs *after* the user authenticates with GitHub but *before* the session is fully created.

## Instructions

1.  **Refactor the API Route (Correction):**
    You currently have `app/api/(auth)/[...nextauth]/route.ts`. 
    *   **Problem:** NextAuth expects the endpoint to be `/api/auth/[...nextauth]`. Because you put it inside `(auth)`, your login callback might fail or act unexpectedly.
    *   **Fix:** Move it to `app/api/auth/[...nextauth]/route.ts`.

2.  **Update `auth.ts` with the `signIn` Callback:**
    Open `auth.ts`. We need to connect to the database and use our `User` model.
    
    *   **Snippet:**
    ```typescript
    import NextAuth from "next-auth"
    import GitHub from "next-auth/providers/github"
    import mongoose from "mongoose"
    import User from "@/models/User" // Import your model

    export const { handlers, signIn, signOut, auth } = NextAuth({
      providers: [GitHub],
      callbacks: {
        async signIn({ user, account, profile }) {
          if (account?.provider === "github") {
            // 1. Connect to database
            await mongoose.connect(process.env.MONGODB_URI!)

            // 2. Check if user exists
            const currentUser = await User.findOne({ email: user.email })
            
            if (!currentUser) {
              // 3. Create user if not found
              const newUser = new User({
                email: user.email,
                username: user.email?.split("@")[0], // Default username
                name: user.name,
                image: user.image,
              })
              await newUser.save()
            }
          }
          return true // Allow the sign-in to proceed
        },
      }
    })
    ```

3.  **Environment Variables:**
    Ensure you have `MONGODB_URI` set in your `.env.local`.

## Your Task
1.  Move your API route to the standard path: `app/api/auth/[...nextauth]/route.ts`.
2.  Implement the `signIn` callback in `auth.ts` to save users to MongoDB.
3.  Test it: Log out, then log back in. Check your MongoDB collection (via Atlas or Compass) to see if a new user record appeared!

**Assessment:** I'll be looking for how you handle the database connection and the logic to prevent duplicate users. Tell me "Task 5 Complete" when the user appears in your database.
