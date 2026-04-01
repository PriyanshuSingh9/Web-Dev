import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const initialUser = async () => {
    const clerkUser = await currentUser();

    if (!clerkUser) { throw new Error("No user found") }

    const user = await db.user.findUnique({
        where: {
            clerkId: clerkUser?.id
        }
    })

    if (user) { return user }

    const newUser = await db.user.create({
        data: {
            clerkId: clerkUser?.id,
            name: `${clerkUser?.firstName} ${clerkUser?.lastName}`,
            // emailAddresses Clerk supports users having multiple email addresses linked to a single account.
            // Because of this, Clerk stores emails as an array (a list) of objects, rather than just a single string.
            email: clerkUser?.emailAddresses[0].emailAddress,
            imageUrl: clerkUser?.imageUrl,
        }
    })

    return newUser;
}