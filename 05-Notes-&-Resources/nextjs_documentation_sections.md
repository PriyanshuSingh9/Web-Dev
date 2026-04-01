# Next.js Documentation Structure

Comprehensive guide to the Next.js documentation sections and sub-sections as of early 2026.

---

## 1. App Router
The App Router is the newer routing paradigm in Next.js, leveraging React Server Components.

### Getting Started
- **Installation**: Automatic and Manual Installation.
- **Project Structure**: Folder and File Conventions.

### Routing
- **Defining Routes**: Folders and Files.
- **Pages and Layouts**: `page.js` and `layout.js`.
- **Linking and Navigating**: `<Link>`, `useRouter`, and Redirects.
- **Loading UI and Streaming**: `loading.js` and Suspense.
- **Error Handling**: `error.js`, `global-error.js`, and `not-found.js`.
- **Parallel Routes**: Simultaneous view rendering.
- **Intercepting Routes**: Modals and Soft Navigation.
- **Route Groups**: Organization without URL impact.
- **Dynamic Routes**: `[id]`, `[...slug]`, and `[[...slug]]`.
- **Route Handlers**: Custom Request Handlers.
- **Middleware**: Running code before requests complete.
- **Internationalization (i18n)**: Multi-language support.

### Data Fetching
- **Fetching, Caching, and Revalidating**: Server-side data management.
- **Server Actions and Mutations**: Data mutations with forms.
- **Patterns**: Fetching on the Server, Client, and Sequential vs. Parallel fetching.

### Rendering
- **Server Components**: Benefits and Use Cases.
- **Client Components**: Interactivity and Lifecycle.
- **Composition Patterns**: Mixing Server and Client Components.
- **Edge and Node.js Runtimes**: Choosing the execution environment.

### Caching
- **Overview**: Caching mechanisms in Next.js.
- **Request Memoization**: `fetch` memoization.
- **Data Cache**: Persistent data storage.
- **Full Route Cache**: Static HTML and Payload storage.
- **Router Cache**: Client-side navigation cache.

### Styling
- **CSS Modules**: Component-level styling.
- **Tailwind CSS**: Utility-first CSS integration.
- **Sass**: Preprocessor support.
- **CSS-in-JS**: Styled Components, Emotion, etc.

### Optimizing
- **Images**: `next/image` and Loader configuration.
- **Videos**: `<video>` and Third-party embeds.
- **Fonts**: `next/font` for local and Google fonts.
- **Scripts**: `next/script` for third-party scripts.
- **Metadata**: SEO with Metadata API.
- **Static Assets**: Using the `public` folder.
- **Lazy Loading**: `next/dynamic` and `React.lazy`.
- **Analytics**: Vercel Analytics integration.
- **Instrumentation**: Monitoring and OpenTelemetry.
- **Open Graph Images**: Dynamic OG generation.

### Configuring
- **TypeScript**: Configuration and Type safety.
- **ESLint**: Linting rules and plugins.
- **Environment Variables**: `.env` files and prefixes.
- **Draft Mode**: Previewing draft content.
- **Content Security Policy**: Security headers.
- **Next.config.js**: Full configuration reference.
- **MDX**: Markdown with JSX support.

### Testing
- **Vitest & Jest**: Unit and Integration testing.
- **Cypress & Playwright**: E2E testing.

### Deploying
- **Production Checklist**: Best practices before launch.
- **Static Exports**: Deploying as a static site.

### Upgrading
- **Codemods**: Automated upgrades.
- **App Router Migration**: Moving from Pages Router to App Router.

---

## 2. Architecture
- **Accessibility**: ARIA and Focus management.
- **Fast Refresh**: Implementation details.
- **Next.js Compiler**: SWC and Rust-based tooling.
- **Supported Browsers**: Compatibility matrix.
- **Turbopack**: New incremental bundler.

---

## 3. Community
- **Contribution Guide**: How to contribute to Next.js.
- **Glossary**: Key terms and definitions.

---

## 4. API Reference
- **CLI**: `next dev`, `next build`, `next start`, `next lint`.
- **Components**: Detailed props for `<Link>`, `<Image>`, `<Script>`, `<Form>`.
- **File Conventions**: `metadata.js`, `sitemap.js`, `robots.js`, `manifest.js`.
- **Functions**: `cookies()`, `headers()`, `redirect()`, `permanentRedirect()`, `notFound()`, `revalidatePath()`, `revalidateTag()`.
- **Hooks**: `useRouter()`, `usePathname()`, `useSearchParams()`, `useSelectedLayoutSegment()`.
- **Edge Runtime**: Available APIs in the Edge environment.
- **Next.config.js**: All available keys and values.
