# Project Requirements Document: Get Me A Chai (v1)

## 1. Project Overview
**Get Me A Chai** is a creator support platform similar to *Buy Me a Coffee* or *Patreon*. It allows creators to build a public profile and receive direct financial support from their audience via Cashfree.

**v1 Philosophy:** This version is intentionally built as a "MERN-style" app using MongoDB Atlas and client-side data fetching (`useEffect`). The architecture mimics a relational structure to facilitate a smooth migration to PostgreSQL in v2.

| Component          | Choice                  | Rationale for v1                                                     |
| :----------------- | :---------------------- | :------------------------------------------------------------------- |
| **Framework** | Next.js 16 (App Router) | Modern standard, ready for v2 migration. |
| **Language** | TypeScript | Type safety for data models. |
| **Authentication** | Auth.js v5 (NextAuth) | GitHub & Google providers. |
| **Database** | Local MongoDB | Faster dev, easy setup, flexible schema. |
| **ODM** | Mongoose | Relational-style modeling. |
| **Payments** | Cashfree | Direct payments to creator's account. |
| **Backend Logic**  | Hybrid (Actions + API)  | Server Actions for private mutations; API for public/3rd-party data. |
| **Styling**        | Tailwind CSS            | Rapid UI development.                                                |

## 3. Core Features & User Stories

### 3.1 Authentication
*   **Sign In:** Users can sign in using GitHub or Google.
*   **Auto-Registration:** First-time login automatically creates a `User` document in MongoDB.
*   **Session:** Stateless JWT-based sessions (no database session storage).
*   **Implementation:** Handled via Auth.js API callbacks.

### 3.2 Creator Dashboard (`/dashboard`)
*   **Protected Route:** Only accessible to logged-in users.
*   **Mutations (Server Actions):** Users can update their:
    *   **Profile:** Display Name, Username, Image URL, Cover Image URL.
    *   **Settings:** Theme toggles.
    *   **Credentials:** Cashfree Client ID and Secret.

### 3.3 Public Profile (`/[username]`)
*   **Public Access:** Anyone can view a creator's profile (e.g., `/priyanshu`).
*   **Data Fetching (API):** Client-side `useEffect` fetches:
    *   Visuals (cover, avatar).
    *   Stats (Total Chai Raised).
    *   Leaderboard of supporters.
*   **Payment UI:** Supporters can select an amount, write a message, and pay.

### 3.4 Payment Processing
1.  **Initiation:** Supporter enters amount/message -> Frontend calls `/api/payments/create-order`.
2.  **Checkout:** Cashfree checkout opens.
3.  **Verification:** On success, frontend redirects back to the creator page (no server-side verification yet).
4.  **Completion:** Backend saves a pending `Payment` record before checkout and relies on the Cashfree session to complete.

## 4. Database Schema (Mongoose)
- *Design Note: MongoDB is used in a relational style (foreign keys, no nesting) to ease future SQL migration.* 

### 4.1 Users Collection
```typescript
{
  _id: ObjectId,
  email: String,          // Unique, from Auth provider
  username: String,       // Unique, user-defined
  name: String,
  image: String,          // URL
  coverImage: String,     // URL
  cashfreeClientId: String,
  cashfreeClientSecret: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 4.2 Payments Collection
```typescript
{
  _id: ObjectId,
  to_user: String,        // Username of the receiver
  donor: String,          // Name of the supporter
  order_id: String,       // Razorpay Order ID
  amount: Number,
  message: String,
  done: Boolean,          // Status: true if verified
  createdAt: Date,
  updatedAt: Date
}
```

## 5. Specification: API vs. Server Actions

### 5.1 API Routes (Public & External)
| Method   | Endpoint                | Description                              |
| :------- | :---------------------- | :--------------------------------------- |
| **GET**  | `/api/users/[username]` | Public profile data & leaderboard.       |
| **POST** | `/api/payments/create-order`  | Creates a Cashfree order (server action). |
| **POST** | `/api/payments/verify`        | Reserved (not implemented yet).          |
| **ANY**  | `/api/auth/*`           | Auth.js handlers (callbacks, providers). |

### 5.2 Server Actions (Private Mutations)
| Action Name         | Description                                    |
| :------------------ | :--------------------------------------------- |
| `updateProfile`     | Updates name, username, image, and coverImage. |
| `updateTheme`       | Toggles UI theme settings.                     |
| `updateCredentials` | Securely saves Cashfree Client ID and Secret.  |

## 6. Architecture & Folder Structure
```
app/
├── (auth)/login/       # Login Page
├── dashboard/          # Private Dashboard
├── [username]/         # Public Profile Page
├── api/                # Backend Routes
│   ├── auth/           # NextAuth handlers
│   ├── payments/       # Payment handlers
│   └── users/          # User fetching/updating
models/                 # Mongoose Models
├── User.ts
└── Payment.ts
```

## 7. Future Roadmap (v2 Migration)
The v1 codebase is designed to be ephemeral. v2 will introduce:
*   **Database:** Migration to PostgreSQL + Prisma.
*   **State:** TanStack Query for caching and optimistic updates.
*   **Storage:** Cloud (AWS S3/Uploadthing) for actual image uploads.
*   **Webhooks:** Robust payment processing via Cashfree Webhooks (handling async success/failure).
