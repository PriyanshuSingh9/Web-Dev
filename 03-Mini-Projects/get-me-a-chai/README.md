# Get Me A Chai ☕

**Get Me A Chai** is a professional creator-support platform designed for the modern web. It enables creators to build a personalized presence and receive direct financial contributions (chais) from their audience, powered by a robust Next.js and MongoDB backend.

---

## 🚀 Features

### For Creators
- **Customized Profiles**: Personalized landing pages at `/[username]` with custom avatars and cover images.
- **Creator Dashboard**: Manage your public presence, track earnings, and update payment credentials securely.
- **Relational Data Integrity**: Built with a "MERN-style" architecture in Next.js to ensure data consistency and future-proofing for SQL migration.

### For Supporters
- **Seamless Contributions**: "Buy a chai" using integrated **Cashfree** payment processing.
- **Personalized Messages**: Leave words of encouragement along with your support.
- **Real-time Leaderboards**: See top and recent supporters instantly on creator profiles.

### Technical Excellence
- **Next.js 16 & TypeScript**: Utilizing the latest App Router features and full type safety.
- **Auth.js v5 (Beta)**: Secure, modern authentication with GitHub and Google OAuth.
- **Tailwind CSS 4**: A stunning, responsive dark-themed UI with advanced CSS features.
- **Server Actions**: Secure, high-performance data mutations without traditional API overhead.

---

## 🏗️ Project Architecture

```text
├── actions/            # Server-side logic for payments and user management
├── app/                # Next.js 16 App Router structure
├── components/         # Modular React components (Navbar, PaymentForm, etc.)
├── lessons/            # Comprehensive build documentation and tutorials
├── lib/                # Core libraries (Database connection, shared utilities)
├── models/             # Mongoose/MongoDB data models
├── types/              # Global TypeScript definitions
└── public/             # Visual assets and static content
```

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) |
| **Authentication** | [Auth.js v5](https://authjs.dev/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) |
| **ODM** | [Mongoose](https://mongoosejs.com/) |
| **Payments** | [Cashfree PG](https://www.cashfree.com/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |

---

## 🚦 Getting Started

### 1. Installation
```bash
git clone https://github.com/yourusername/get-me-a-chai.git
cd get-me-a-chai
npm install
```

### 2. Configuration
Create a `.env.local` file with the following variables:
```env
# MongoDB
MONGODB_URI=your_mongodb_uri

# Authentication
AUTH_SECRET=your_auth_secret # Generate with: npx auth secret
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# Payments (Cashfree)
CASHFREE_APP_ID=your_app_id
CASHFREE_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CASHFREE_ENV=TEST # or PRODUCTION
```

### 3. Execution
```bash
npm run dev
```

---

## 📚 Learning Path
This project is documented as a series of lessons to help developers understand modern full-stack patterns:
- [01-Installation](./lessons/01-installation.md)
- [03-OAuth & Middleware](./lessons/03-oauth-and-middleware.md)
- [05-Database Integration](./lessons/05-database-integration.md)
- [07-Dashboard Logic](./lessons/07-dashboard.md)

---

## 🔮 Future Enhancements (v2)
- **Database Migration**: Moving to PostgreSQL + Prisma for enterprise-grade scalability.
- **Image Hosting**: Transitioning from external URLs to AWS S3/Cloudinary.
- **Advanced Webhooks**: Handling complex payment lifecycles with Cashfree webhooks.
- **Global Search**: Discover creators by name, niche, or popularity.

---
*Developed with a focus on clean code, performance, and modern developer experience.*
