# Custom Typography with Next.js and Tailwind CSS (Discord Clone)

This guide walks through configuring custom brand fonts (specifically for a Discord clone) in a Next.js 15+ application using `next/font/local` and the Tailwind CSS v4 `@theme inline` configuration.

## The Goal
To replace the default Next.js fonts (Geist and Geist Mono) with Discord's brand fonts:
- **Ginto Nord**: Used for bold, impactful headlines.
- **Ginto**: Used for subheadings and medium copy.
- **gg sans**: The primary sans-serif font used for general UI text.

## 1. Organizing Font Files

First, all the downloaded font files need to go directly into the Next.js `public` directory. By convention, it's best to put them inside a `public/fonts` folder.

We only copy the required `woff2` and `ttf` files into `public/fonts/`. For example:
- `ABCGintoDiscordNord-Bold.woff2`
- `ABCGintoDiscord-Regular.woff2`
- `ggsans-Normal.ttf`

> **Why?** Files in the `public` directory can be statically served by Next.js and securely referenced by Next's built-in font loader.

## 2. Loading Fonts in `app/layout.tsx`

Next.js provides an incredibly powerful optimization tool: `@next/font` (now `next/font/local` and `next/font/google`). It strips away layout shift (CLS) by automatically adding fallback fonts and `size-adjust` properties behind the scenes.

In your `app/layout.tsx` file, we initialize the font files for our 3 specific categories:

```typescript
import localFont from "next/font/local";

const gintoNord = localFont({
  src: [
    {
      path: "../public/fonts/ABCGintoDiscordNord-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    // ...other styles (Italic, BlackItalic)
  ],
  variable: "--font-ginto-nord", // Creates a CSS variable name for styling
});

const ginto = localFont({
  src: [
    { path: "../public/fonts/ABCGintoDiscord-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/ABCGintoDiscord-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-ginto",
});

const ggSans = localFont({
  src: [
    { path: "../public/fonts/ggsans-Normal.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/ggsans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-gg-sans",
});
```

### Applying Variables to the Document `<body/>`

To make these fonts accessible to our CSS, we attach their generated CSS variable strings to the `<body>` tag. Using the `.variable` property allows Tailwind and plain CSS to reference them via `var(--font-...)` safely.

```tsx
<body className={`${ggSans.className} ${gintoNord.variable} ${ginto.variable} ${ggSans.variable} antialiased`}>
```

> Note we also include `${ggSans.className}` which sets the default `font-family` property on the body element.

## 3. Registering the Font Variables in Tailwind CSS

With Tailwind v4's new CSS-first configuration, we don't use `tailwind.config.js` anymore. Instead, we define CSS variables and link them together natively using `@theme inline` in `app/globals.css`.

Since we defined `--font-gg-sans` in our layout, we can map this custom CSS variable to Tailwind's typography system.

```css
/* app/globals.css */

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  
  /* We map our Layout.tsx variable to Tailwind Font Utility classes */
  --font-sans: var(--font-gg-sans);
  --font-headline: var(--font-ginto-nord);
  --font-subhead: var(--font-ginto);
  
  /* ...rest of theme */
}
```

By mapping `--font-sans` to `--font-gg-sans`, any component using Tailwind's `font-sans` class will utilize Discord's `gg sans` font!
Additionally, tying `--font-headline` allows us to use standard utility class `font-headline` wherever we need Ginto Nord.

## 4. Setting Global Defaults

Instead of manually typing `font-sans` or `font-headline` across hundreds of components throughout the application, we can use CSS base layers to dictate styling on standard HTML tags.

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  
  /* Set standard text properties */
  body {
    @apply bg-background text-foreground font-sans;
  }
  
  /* Make all headers use Ginto Nord Bold by default */
  h1, h2, h3, h4, h5, h6 {
    @apply font-headline font-bold;
  }
}
```

Now, every time you render an `<h1>` element, it will automatically employ the custom `Ginto Nord (Bold)` brand font without explicitly needing inline utility classes. 
