import mongoose from "mongoose";
import type { userType } from "@/types/types";

const userSchema = new mongoose.Schema<userType>({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    coverImage: { type: String },
    cashfreeClientId: { type: String },
    cashfreeClientSecret: { type: String },
}, { timestamps: true })

// Next.js recompiles files constantly. mongoose.model("Users", ...) tries to create the model every time,
// leading to an OverwriteModelError.
export default mongoose.models.User || mongoose.model("User", userSchema);
