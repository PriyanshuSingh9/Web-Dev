import mongoose from "mongoose";
import { shortenFormData } from "../types/types";

const urlSchema = new mongoose.Schema<shortenFormData>({
    originalUrl: {
        type: String,
        required: true,
        trim: true,
    },
    shortUrl: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    },
}, {
    collection: "urls",
})

// Next.js recompiles files constantly. mongoose.model("Users", ...) tries to create the model every time,
// leading to an OverwriteModelError. 
// To prevent this, we check if the model already exists before creating it.
export default mongoose.models.Url || mongoose.model("Url", urlSchema)
