import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "./generated/prisma/client";

// declare global is used so that TypeScript knows `globalThis` has a `prisma` property.
// `globalThis` is a standard way to access the global scope in JavaScript (like `window` in browsers or `global` in Node.js).
declare global {
    var prisma: PrismaClient | undefined
}

// We retrieve the database connection string from our environment variables.
const connectionString = `${process.env.DATABASE_URL}`

// By using `PrismaPg` as an adapter, we can leverage connection pooling features
// out of the box with Postgres databases for serverless environments.
const adapter = new PrismaPg({ connectionString })

// Here we export the `db` variable so the rest of our application can interact with the database.

// HOW THIS WORKS:
// In Next.js development mode, the server frequently restarts (Hot Module Replacement).
// If we just initialize `new PrismaClient()` every time, we will quickly exhaust our database connection limit.
//
// By storing the client instance on the `globalThis` object, we ensure that only ONE connection pool exists.
// We check if `globalThis.prisma` already exists. If it does, we reuse it.
// If it doesn't (like on the first startup), we create a new `PrismaClient` with our adapter.
export const db = globalThis.prisma || new PrismaClient(
    { adapter }
)

// In development, we store the newly created `db` instance into the global object so that 
// future hot-reloads will reuse it instead of creating a new connection.
// We skip this in production because the code runs in a stable, long-lived process.
if (process.env.NODE_ENV !== "production") globalThis.prisma = db