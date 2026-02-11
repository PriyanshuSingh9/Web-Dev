"use server"
import connectDB from "@/lib/db";
import Payment from "@/models/Payment";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import User from "@/models/User";
import { OrderRequest, userType } from "@/types/types";

export async function intializePayments(amount: number, to_username: string, donor: userType, message: string): Promise<any> {
    console.log("intializePayments called with:", { amount, to_username, donorName: donor?.name, donorEmail: donor?.email });
    await connectDB()

    const recipient: userType | null = await User.findOne({ username: to_username })
    if (!recipient) {
        throw new Error("User not found")
    }
    if (!recipient.cashfreeClientId || !recipient.cashfreeClientSecret) {
        throw new Error("User does not have cashfree configured")
    }
    const cashfree = new Cashfree(
        CFEnvironment.SANDBOX,
        process.env.CASHFREE_CLIENT_ID!,
        process.env.CASHFREE_CLIENT_SECRET!
    )

    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${donor}?payment=done`

    try {
        const request: OrderRequest = {
            order_id: orderId,
            order_amount: amount,
            order_currency: "INR",
            customer_details: {
                customer_id: donor.email.replace(/[^a-zA-Z0-9]/g, '_'),
                customer_name: donor.name,
                customer_email: donor.email,
                customer_phone: "9999999999",
            },
            order_meta: {
                return_url: returnUrl,
            },
            order_note: message || "",
        }

        const response = await cashfree.PGCreateOrder(request);

        // Fix 5: Save pending payment to database
        console.log("Attempting to save payment to DB...");
        const newPayment = await Payment.create({
            donor: donor.name,
            to_user: to_username,
            amount: amount,
            order_id: orderId,
            done: false,
            message: message || ""
        });
        console.log("Payment record created in DB:", newPayment._id);

        // Fix 4: Return response data (contains payment_session_id)
        return response.data;
    } catch (error: any) {
        console.error("Error setting up order request:", error);
        console.error("Error details:", error.response?.data);
        throw new Error(error.response?.data?.message || error.message || "Payment initiation failed");
    }
}

