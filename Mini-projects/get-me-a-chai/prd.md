# Project Requirements Document: Get Me A Chai

This document outlines the roadmap for building "Get Me A Chai," a crowdfunding platform where creators can receive support from their audience. This plan strictly adheres to modern web development standards, utilizing a robust tech stack for production-grade quality.

## 1. Project Overview
"Get Me A Chai" is a web application allowing users to create profiles, accept financial support (chai) via Razorpay, and display a leaderboard of supporters. It mimics functionality found in platforms like "Buy Me a Coffee."

## 2. Technical Stack
To ensure scalability, type safety, and maintainability, the project will use the following modern technologies:

*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript (Strict Mode)
*   **Styling:** Tailwind CSS + **Shadcn/UI** (Headless components)
*   **Authentication:** **Auth.js (v5)** (formerly NextAuth.js) with GitHub Provider
*   **Database:** MongoDB via **Prisma ORM**
*   **Forms & Validation:** **React Hook Form** + **Zod** schema validation
*   **Payments:** Razorpay API (with Webhook verification)
*   **Deployment:** Docker / Vercel

## 3. Core Functional Requirements

### 3.1 Authentication
*   **Social Login:** GitHub authentication via Auth.js.
*   **User Onboarding:** Automatic database record creation upon first login.
*   **Session Management:** Secure session handling using Auth.js server-side helpers and client-side hooks.

### 3.2 User Dashboard (Protected)
*   **Profile Management:** Form to update display name, email, username, profile picture, and cover image.
*   **Payment Credentials:** Secure input fields for Razorpay Key ID and Secret (required to receive payments).
*   **Tech Spec:** Protected route (`/dashboard`) utilizing Server Actions for data mutation.

### 3.3 Dynamic Public Profile (`/[username]`)
*   **Visuals:** Display user's cover image, profile picture, and bio.
*   **Stats:** Show total amount raised and total supporter count.
*   **Payment Interface:** Interactive section for supporters to choose an amount and leave a message.
*   **Leaderboard:** Real-time list of recent supporters sorted by date or amount.

### 3.4 Payment Processing
*   **Gateway:** Razorpay integration supporting INR.
*   **Flow:** Server-side order creation -> Client-side checkout modal -> Server-side webhook verification.
*   **Security:** Signature verification on the backend to prevent transaction tampering.

## 4. Architecture & Components

### 4.1 Directory Structure (App Router)
```
app/
├── (auth)/             # Route groups for auth pages
│   └── login/
├── (marketing)/        # Route groups for landing pages
│   └── page.tsx
├── [username]/         # Dynamic profile route
│   └── page.tsx
├── dashboard/          # Protected user settings
│   └── page.tsx
├── api/
│   ├── auth/           # Auth.js endpoints
│   └── webhooks/       # Razorpay webhook handler
└── components/         # Shadcn & Custom components
```

### 4.2 Key Components
*   **`Navbar`:** Responsive navigation with dynamic Auth states (Login btn vs User Dropdown).
*   **`PaymentPage` (Client Component):** Handles the Razorpay interaction, form state (Amount, Message), and optimistic updates.
*   **`ProfileCard`:** Reusable component for displaying user stats and info.
*   **`SupporterList`:** Scrollable list component for the leaderboard.

## 5. Data & State Strategy

### 5.1 Database Schema (Prisma)
*   **User:** `id`, `email`, `username`, `image`, `coverImage`, `razorpayCredentials`, `createdAt`
*   **Payment:** `id`, `amount`, `message`, `fromUser` (optional), `toUser` (relation), `orderId`, `status`, `timestamp`

### 5.2 State Management
*   **Server State:** Native **Server Components** for fetching data. Data is fetched directly on the server and passed to components.
*   **Form State:** **React Hook Form** for all inputs to minimize re-renders and handle validation logic efficiently.
*   **Mutations:** Next.js **Server Actions** for all data modifications (Update Profile, Initiate Payment). Use `revalidatePath` to refresh UI data after mutations.

## 6. Implementation Milestones

### Phase 1: Setup & Infrastructure
*   Initialize Next.js 15 project with TypeScript and Tailwind.
*   Install and configure **Shadcn/UI** (Button, Input, Card, Dropdown components).
*   Set up **Prisma** with MongoDB connection string.
*   Configure **Docker** for consistent development environment.

### Phase 2: Authentication & Schema
*   Define Prisma Schema for `User` and `Payment`.
*   Configure **Auth.js v5** with GitHub provider.
*   Create `middleware.ts` to protect dashboard routes.

### Phase 3: Dashboard & Profile Features
*   Build the Dashboard using **React Hook Form** + **Zod**.
*   Implement `updateProfile` Server Action.
*   Create dynamic `/[username]` page fetching data via Prisma.
*   Implement `next/image` for optimized asset loading (User avatars/covers).

### Phase 4: Payments Integration
*   Set up Razorpay account and get API keys.
*   Implement **Order Creation** Server Action (`razorpay.orders.create`).
*   Build the Payment UI with predefined amount buttons.
*   Implement **Webhook** endpoint (`/api/webhooks/razorpay`) to verify signatures and update database status securely.

### Phase 5: Polish & Optimization
*   Add proper loading states (Skeletons) using Shadcn.
*   Implement "Leaderboard" logic.
*   Audit Core Web Vitals and accessibility.
