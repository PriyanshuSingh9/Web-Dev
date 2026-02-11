import { load } from "@cashfreepayments/cashfree-js"
import { intializePayments } from "@/actions/paymentActions";

export async function startPayment(amount: number, username: string, donor: any, message: string) {
    try {
        const orderData = await intializePayments(amount, username, donor, message)
        const sessionId = orderData.payment_session_id

        const cashfree = await load({
            mode: "sandbox"
        })

        cashfree.checkout({
            paymentSessionId: sessionId,
            redirectTarget: "_self"
        });
    } catch (err) {
        console.error("Payment failed", err);
    }
}