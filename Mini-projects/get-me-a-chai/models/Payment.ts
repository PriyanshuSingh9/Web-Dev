import mongoose from "mongoose"
import type { paymentType } from "@/types";

const paymentSchema = new mongoose.Schema<paymentType>({
    to_user: { type: String, required: true },
    donor: { type: String, required: true },
    amount: { type: Number, required: true },
    order_id: { type: String, required: true },
    message: { type: String },
    done: { type: Boolean, default: false },
}, { timestamps: true });

// Next.js recompiles files constantly. mongoose.model("Users", ...) tries to create the model every time,
// leading to an OverwriteModelError.
export default mongoose.models.Payments || mongoose.model("Payments", paymentSchema);