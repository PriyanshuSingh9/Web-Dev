# UploadThing Setup Guide (Project Example)

This project uses **UploadThing** to handle file uploads (like server images and message attachments). This guide explains how it is set up and used within this specific codebase.

### 1. The Core Upload Router (`app/api/uploadthing/core.ts`)
This is the heart of UploadThing. Here, you define separate "routes" for different types of uploads, which include validation (size, type, count) and middleware (authentication).

```typescript
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

// Reusable auth check to ensure only logged-in users can upload
const handleAuth = async () => {
    const { userId } = await auth()
    if (!userId) {
        throw new UploadThingError("Unauthorized")
    }
    return { userId: userId } // Passed to onUploadComplete metadata
}

export const ourFileRouter = {
    // Route 1: For Server Images
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),

    // Route 2: For Message Attachments (Images or PDFs)
    messageFile: f({
        image: { maxFileSize: "4MB", maxFileCount: 1 },
        pdf: { maxFileSize: "4MB", maxFileCount: 1 }
    })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
```

### 2. Next.js API Route Handler (`app/api/uploadthing/route.ts`)
Once the core router is defined, it needs to be exposed as an API endpoint so the client can talk to the UploadThing servers securely.

```typescript
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Exposes the router to standard HTTP GET and POST requests
export const { GET, POST } = createRouteHandler({
    router: ourFileRouter,
});
```

### 3. Client Component Generation (`lib/uploadThing.ts`)
UploadThing provides ready-to-use React components. However, by generating them with your `OurFileRouter` type, you get full TypeScript support across your entire app (it will auto-complete `serverImage` or `messageFile`).

```typescript
import {
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

// These are now strongly-typed components ready to be used anywhere
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
```

### 4. Client Usage: Reusable Component (`components/FileUpload.tsx`)
Instead of using the raw `UploadDropzone` everywhere, this project wraps it inside a `FileUpload` component. This handles styling, the CSS import, and showing a preview of the uploaded file (or an "X" button to delete it locally).

```tsx
import { UploadDropzone } from "@/lib/uploadThing"
// IMPORTANT: You must import these styles for the dropzone to look correct
import "@uploadthing/react/styles.css"

interface fileUploadProps {
    endpoint: "messageFile" | "serverImage", // Enforcing type safety based on your defined routes
    value: string,
    onChange: (url?: string) => void,
    className?: string
}

const FileUpload = ({ endpoint, value, onChange }: fileUploadProps) => {
    // If a file string exists (meaning it was uploaded), show the image/preview
    const fileType = value?.split(".").pop()
    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
               {/* Display the uploaded image */}
               {/* "X" button sets the value back to "" via onChange("") */}
            </div >
        )
    }
    
    // Otherwise, show the UploadThing Dropzone
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                // 'res' is an array of uploaded files. 
                // We pick the first one and extract its new live URL (ufsUrl)
                const url = res?.[0]?.ufsUrl 
                onChange(url) // Propagates the URL up to react-hook-form
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}
```

### Summary of the Flow:
1. User drops a file into `<FileUpload>` (which renders `<UploadDropzone>`).
2. `<UploadDropzone>` calls `/api/uploadthing` to get a secure upload token.
3. The server runs `handleAuth()` (via Clerk) to ensure the user is logged in.
4. The client uploads the file directly to UploadThing storage.
5. On success, `onClientUploadComplete` fires, giving you the `ufsUrl` of the new file.
6. The `onChange(url)` passes that URL up to `react-hook-form` so it can be saved in your database when they click "Submit".
