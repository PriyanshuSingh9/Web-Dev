# Next.js Concepts & Project Revision

This document serves as a revision guide for the current Next.js project. It covers the file structure, core concepts, and specific Next.js components used (`<Image>`, `<Link>`, `<Script>`), along with configuration details.

---

## 1. Project Structure (App Router)

This project uses the Next.js **App Router**.

-   **`app/`**: Contains the main application code.
    -   **`layout.js`**: Defines the UI shared across routes (Root Layout).
    -   **`page.js`**: The UI for a specific route (e.g., home page).
    -   **`[route]/page.js`**: Defines nested routes (e.g., `app/about/page.js` -> `/about`).
-   **`components/`**: Houses reusable UI components like `Navbar` and `Footer`.
-   **`next.config.mjs`**: Configuration file for Next.js.

---

## 2. Global Layout & Metadata (`app/layout.js`)

The `RootLayout` component wraps the entire application. It is the perfect place for global providers, fonts, and persistent layout elements like navigation bars.

### Key Features:
*   **Font Optimization**: Uses `next/font/google` to load Geist fonts efficiently.
*   **Metadata**: Defines the default `title` and `description` for SEO.
*   **Structure**: Wraps `children` (the specific page content) with the `Navbar` and `Footer`.

```javascript
// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar.js"
import Footer from "@/components/Footer.js"

// Metadata Object
export const metadata = {
  title: "Facebook- connect with the world",
  description: "Kamal app hai ye to zuck bhai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="...">
        <Navbar />
        <div className="mx-auto min-h-[83vh]">
          {children} {/* This renders the content of the current page */}
        </div>
        <Footer />
      </body>
    </html>
  );
}
```

---

## 3. Navigation: The `<Link>` Component (`components/Navbar.js`)

Next.js uses the `<Link>` component for **client-side transitions** between routes. Unlike standard HTML `<a>` tags, `<Link>` does not reload the page, resulting in a faster, "single-page app" feel.

```javascript
// components/Navbar.js
import Link from 'next/link'

// Usage
<ul className='flex gap-6'>
    <li><Link href="/">Home</Link></li>
    <li><Link href="/about">About</Link></li>
    <li><Link href="/contact">Contact</Link></li>
</ul>
```

---

## 4. Image Optimization: The `<Image>` Component (`app/page.js`)

The `<Image>` component (`next/image`) extends the HTML `<img>` element with automatic optimization features.

### Why use `<Image>`?
*   **Size Optimization**: Automatically serves correctly sized images for each device, using modern formats like WebP/AVIF.
*   **Layout Stability**: Prevents layout shift (CLS) automatically while images are loading.
*   **Lazy Loading**: Images are only loaded when they enter the viewport.

### Configuration (`next.config.mjs`)
To load images from remote domains (like `i.pinimg.com`), you **must** configure `remotePatterns` in `next.config.mjs`.

```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
      },
    ],
  },
};
```

### Usage Example
```javascript
// app/page.js
import Image from "next/image";

// Notes from code:
// - Width/Height are required for remote images to reserve space (prevents layout shift).
// - 'quality' prop (1-100) controls compression level.
// - 'loader' prop can be used for custom image CDNs.

<Image 
  src="https://i.pinimg.com/1200x/e9/70/9a/e9709ae4ada84e9a331801aa48a6606a.jpg" 
  alt="" 
  className="mx-auto" 
  width={100} 
  height={100} 
/>
```

---

## 5. Script Optimization: The `<Script>` Component (`app/contact/page.js`)

The `<Script>` component (`next/script`) allows you to optimize loading third-party scripts (Google Analytics, Ads, Chat widgets).

### Loading Strategies (`strategy` prop):
1.  **`afterInteractive`** (Default): Loads immediately after the page becomes interactive. Good for analytics.
2.  **`lazyOnload`**: Loads during idle time. Good for low-priority scripts (e.g., chat widgets).
3.  **`beforeInteractive`**: Loads before the page becomes interactive. Critical scripts only (e.g., bot detection).
4.  **`worker`** (Experimental): Loads in a web worker.

```javascript
// app/contact/page.js
import Script from 'next/script'

const Contact = () => {
    return (
        <div>
            {/* Inline script example */}
            <Script>
                {`alert("This is the contact page")`}
            </Script>
            I am Contact
        </div>
    )
}
```

---

## 6. Page-Specific Metadata (`app/about/page.js`, `app/contact/page.js`)

You can define a `metadata` object in any `page.js` or `layout.js` file to customize SEO tags (title, description) for that specific route. This overrides the metadata defined in the root layout.

```javascript
// app/about/page.js
export const metadata = {
    title: "About Facebook",
    description: "Kamal baat facebook ke baare mai",
};
```

---

## Summary of Files & Purpose

| File | Purpose | Key Concepts |
| :--- | :--- | :--- |
| **`app/layout.js`** | Root layout wrapping all pages. | Font loading, Global Metadata, Navbar/Footer inclusion. |
| **`app/page.js`** | Home page content. | `<Image>` component usage, Image properties. |
| **`app/contact/page.js`** | Contact page. | `<Script>` component strategies, Route-specific metadata. |
| **`app/about/page.js`** | About page. | Route-specific metadata. |
| **`components/Navbar.js`** | Navigation Bar. | `<Link>` component for client-side navigation. |
| **`next.config.mjs`** | Configuration. | `remotePatterns` for allowing external images. |
