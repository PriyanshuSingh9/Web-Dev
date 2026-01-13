# Next.js Concepts for Beginners

## 1. Introduction to Next.js
Next.js is a React framework for building full-stack web applications. It extends React by adding features like server-side rendering (SSR), static site generation (SSG), and automatic routing, which improve performance and SEO.

Key benefits:
- **Server Components:** Render components on the server for better performance.
- **File-based Routing:** No need for complex router configurations; the file system defines the routes.
- **API Routes:** Build backend endpoints directly within your Next.js application.

## 2. Project Folder Structure
Here is a walkthrough of the typical folders you see in your project:

- **`app/`**: This is the core of the App Router. It contains your pages, layouts, and global styles.
- **`component/`** (or `components/`): Stores reusable UI components like your `Navbar.js`.
- **`public/`**: Static assets like images (`next.svg`, `vercel.svg`), fonts, and icons. Files here can be referenced directly by URL (e.g., `/next.svg`).
- **`next.config.mjs`**: Configuration file for Next.js options.
- **`package.json`**: Lists dependencies and scripts (like `dev`, `build`, `start`).
- **`jsconfig.json`**: Configuration for JavaScript options, including path aliases.

## 3. App-Based Routing (The `app` Directory)
In Next.js 13+, the **App Router** uses the `app/` directory to define routes.

### How it works:
- **Folders define routes:** A folder name becomes a URL path segment.
- **`page.js` defines the UI:** The `page.js` file inside a folder makes that route publicly accessible.

### Examples from your project:
1.  **Home Page (`/`)**:
    - File: `app/page.js`
    - URL: `http://localhost:3000/`

2.  **About Page (`/about`)**:
    - File: `app/about/page.js`
    - URL: `http://localhost:3000/about`

3.  **Contact Page (`/contact`)**:
    - File: `app/contact/page.js`
    - URL: `http://localhost:3000/contact`

### Special Files in `app/`:
- **`layout.js`**: Defines a shared UI (like a Navbar or Footer) that wraps page content. The root `app/layout.js` is required and must contain `<html>` and `<body>` tags.
- **`page.js`**: The unique UI for a specific route.

## 4. The `@` Alias
The `@` symbol is a path alias configured in your `jsconfig.json` (or `tsconfig.json`). It allows you to import files from the root of your project without using long relative paths like `../../`.

**Your Configuration (`jsconfig.json`):**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**How to use it:**
Instead of calculating how many folders to go up, you can start from the project root.

*Without Alias (Relative Path):*
```javascript
// Inside app/about/page.js
import Navbar from "../../component/Navbar";
```

*With Alias:*
```javascript
// Inside app/about/page.js
import Navbar from "@/component/Navbar";
```

This makes your imports cleaner and easier to move around without breaking.

## 5. Summary of How It Works
1.  **Request:** A user visits `/about`.
2.  **Routing:** Next.js looks in `app/about/`.
3.  **Layout:** It wraps the content in `app/layout.js` (and any nested layouts).
4.  **Rendering:** It renders `app/about/page.js`. By default, this happens on the server (Server Component), sending completed HTML to the browser.
5.  **Hydration:** React takes over in the browser to make the page interactive.
