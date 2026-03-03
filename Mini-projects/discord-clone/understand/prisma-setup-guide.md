# Prisma Setup Guide for Beginners

Welcome to the Prisma Setup Guide! This tutorial covers how we set up Prisma in this project from scratch. It explains not just the *what*, but the *why* behind our decisions so you understand the nuances of connecting a Next.js application to a database.

---

## 1. What is Prisma?

Prisma is an **ORM** (Object-Relational Mapper) for Node.js and TypeScript. 
Instead of writing raw SQL strings like `SELECT * FROM users WHERE email = 'test@test.com'`, Prisma lets you interact with your database using familiar JavaScript/TypeScript methods like:
```ts
db.user.findUnique({ where: { email: "test@test.com" } })
```

**Why Prisma?**
- **Type Safety**: It generates TypeScript types based exactly on your database tables. If you misspell a column name, your code won't even compile!
- **Developer Experience**: It provides excellent auto-completion in VSCode.
- **Migrations**: It tracks changes to your database schema over time.

---

## 2. Initial Setup Commands

To get Prisma running in a new project, here are the commands typically used:

1. **Install Prisma as a dev dependency:**
   ```bash
   npm install prisma --save-dev
   ```
2. **Initialize Prisma:**
   ```bash
   npx prisma init
   ```
   *This command creates a new `prisma` directory with a `schema.prisma` file, and an `.env` file for your database connection string.*

3. **Install the Prisma Client (used in your actual app code):**
   ```bash
   npm install @prisma/client
   ```

Because this project uses PostgreSQL in a serverless environment (like Vercel) and potentially connects to a Neon database, we also installed the Neon Postgres adapter for better connection pooling:
```bash
npm install @prisma/adapter-pg
npm install pg
npm install -D @types/pg
```

---

## 3. The Database Schema (`prisma/schema.prisma`)

The `schema.prisma` file is the absolute source of truth for your database. It defines what database you connect to, how the Prisma Client is generated, and the structure of your actual tables (Models).

### Setup and Generators
```prisma
generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```
**Nuance:** By default, Prisma generates the TypeScript client into the `node_modules` folder. However, we explicitly changed the `output` to `../lib/generated/prisma`. 
**Why?** In some monorepos or complex Next.js setups, keeping the generated client in your own source code directories avoids frustrating "type not found" issues or caching problems when deploying.

### The Models
Models represent the tables in your database. Let's look at the `User` and `Server` models:

```prisma
model User {
  id       String @id @default(uuid())
  clerkId  String @unique
  name     String
  imageUrl String @db.Text 
  email    String @unique @db.Text

  // Relations
  servers  Server[]
  members  Member[]
  channels Channel[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Server {
  id         String @id @default(uuid())
  serverName String 
  imageUrl   String @db.Text 
  inviteCode String @db.Text
  
  userId     String
  user       User @relation(fields:[userId], references: [id], onDelete:Cascade)

  // ...other relations and timestamps
  @@index([userId])
}
```

**Key Highlights:**
- **`@id @default(uuid())`**: Instead of auto-incrementing integers (1, 2, 3), we use UUIDs (long random strings). This is much more secure for URLs (e.g., `/servers/abc-123` instead of `/servers/1`) because users can't guess the next ID.
- **`@unique`**: Ensures no two users can register with the same Clerk ID or Email.
- **`@db.Text`**: This tells PostgreSQL to use the `TEXT` data type instead of a standard `VARCHAR`. URLs (like profile pictures) can sometimes be extremely long and exceed standard character limits.
- **Relations**: `servers Server[]` on the User model creates a one-to-many relationship (one user can own many servers).
- **`onDelete: Cascade`**: If a `User` is deleted from the database, every `Server` they made will automatically be deleted too. This prevents "orphan" records!
- **`@@index([userId])`**: This is a performance optimization. It tells the deeply nested levels of the database to keep a sorted index of `userId`s, making it much faster to run queries like *"Find all servers where userId equals X"*.

### Pushing changes
Every time you change this file, you run:
- `npx prisma generate` *(to update your TypeScript types)*
- `npx prisma db push` *(to actually push the changes to your PostgreSQL database)*

---

## 4. The `lib/generated` Folder
Because of the `output` path in our `schema.prisma` file, running `npx prisma generate` creates the `lib/generated/prisma` folder. 

**What's inside?**
It contains hundreds of lines of deeply complex TypeScript code tailored specifically to your schema. This is what provides your IDE with autocomplete. If you type `db.user.findFirst({ where: { } })`, it's this generated folder that tells VSCode that `clerkId` and `email` are valid things to search for. 

**Rule of thumb:** NEVER edit the files inside `lib/generated/`. They are overwritten entirely every single time you run `npx prisma generate`.

---

## 5. Connecting to the Database (`lib/db.ts`)

Once the tools are installed and the schema is pushed, our Next.js app needs to actually talk to the database. We do this in `lib/db.ts`.

```ts
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "./generated/prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })

export const db = globalThis.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db
}
```

### The "Next.js Hot-Reload" Problem
This file looks a bit more complicated than just `export const db = new PrismaClient()`. Why?

In development mode (`npm run dev`), Next.js constantly clears its cache and restarts the server every time you save a file. If we simply used `new PrismaClient()`, Next.js would open a brand new connection to PostgreSQL on every save, without closing the old ones. Within a few minutes, you would hit the maximum connection limit of your database provider (like Neon or Supabase) and your app would crash.

**The Solution (The Singleton Pattern):**
We attach the `PrismaClient` to `globalThis`, which is a global JavaScript object that *survives* Next.js hot-reloads. 
1. The code asks: *"Does `globalThis.prisma` already exist?"* 
2. If YES (because we saved a file earlier): It reuses the exact same database connection.
3. If NO (first time booting up): It spins up `new PrismaClient()` and immediately saves it to `globalThis.prisma` for the next time.

### The PrismaPg Adapter
We also pass in an `adapter` using `@prisma/adapter-pg`. This allows Prisma to use native PostgreSQL connection pooling drivers, which are significantly faster and more stable in serverless environments than standard connections.

---

## 6. Our First Database Operation (`lib/initial-user.ts`)

Now that we have our `db` exported, how do we use it? `lib/initial-user.ts` is a perfect example. This file is triggered the moment a user hits the application, ensuring they exist in our database before letting them proceed.

```ts
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const initialUser = async () => {
    // 1. Get the currently logged in user from Clerk (our auth provider)
    const clerkUser = await currentUser();
    if (!clerkUser) { throw new Error("No user found") }

    // 2. Query our own database to see if this user already exists
    const user = await db.user.findUnique({
        where: { clerkId: clerkUser.id }
    })

    // 3. Return the user if we found them!
    if (user) { return user }

    // 4. User didn't exist in our DB, so we must create them.
    const newUser = await db.user.create({
        data: {
            clerkId: clerkUser.id,
            name: `${clerkUser.firstName} ${clerkUser.lastName}`,
            email: clerkUser.emailAddresses[0].emailAddress,
            imageUrl: clerkUser.imageUrl,
        }
    })

    return newUser;
}
```

### `findUnique` vs `findFirst`
Notice we use `db.user.findUnique`. You only use `findUnique` when querying a field marked as `@id` or `@unique` in your `schema.prisma` (in our case, `clerkId` is unique). This is highly optimized by the database. If you needed to search by something non-unique (like `name`), you would have to use `findFirst` or `findMany`.

### Creating the User
When doing `db.user.create`, Prisma's TypeScript types enforce that we provide all required fields (`clerkId`, `name`, `email`, `imageUrl`). 
- **Nuance:** We extract the email from `clerkUser.emailAddresses[0].emailAddress` because Clerk supports multiple emails per account, storing them in an array. We grab the primary one at index `0`.

---
And that's the core of Prisma! Define your truth in `schema.prisma`, safely connect in `db.ts`, and perform strongly typed queries in your app using `db.user.xxx`.
