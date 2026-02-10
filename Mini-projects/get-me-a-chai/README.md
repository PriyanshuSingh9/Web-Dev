# Get Me A Chai ☕

A crowdfunding platform for creators, built with the latest Next.js 15 features. This project allows users to create a profile, accept support from fans, and manage their dashboard.

**Status:** 🚧 Archived / Prototype
*This project serves as a proof-of-concept for Next.js Server Actions and Authentication patterns. Payment integration is currently UI-only.*

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Auth:** [NextAuth.js v5](https://authjs.dev/) (Beta)
- **Database:** MongoDB (via Mongoose)
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form
- **Server Actions:** Used for all data mutations (no API routes)

## ✨ Features Implemented

- **Authentication:** GitHub and Google OAuth login via NextAuth v5.
- **Dynamic Profile Pages:** Public-facing pages (e.g., `/[username]`) showing creator details and top supporters.
- **Dashboard:** User dashboard to update profile details (Name, Cover Image, Razorpay credentials).
- **Responsive UI:** Dark-themed, mobile-responsive design with Tailwind.
- **Data Fetching:** Server-side rendering (SSR) for fast profile loads and SEO.

## 🛠️ Getting Started

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/yourusername/get-me-a-chai.git
    cd get-me-a-chai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    AUTH_SECRET=your_nextauth_secret
    AUTH_GITHUB_ID=your_github_id
    AUTH_GITHUB_SECRET=your_github_secret
    AUTH_GOOGLE_ID=your_google_id
    AUTH_GOOGLE_SECRET=your_google_secret
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🔮 Future Improvements (If revisited)

- **Razorpay Integration:** Connect the `PaymentForm` to actual Razorpay order creation.
- **Input Validation:** Add Zod schemas to Server Actions for strict type safety.
- **Loading UI:** Add `loading.tsx` skeletons for smoother transitions.

---
*Created as a learning project to explore the capabilities of Next.js 15.*