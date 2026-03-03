import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"

export const currentUser = async () => {
    const { userId } = await auth()

    if (!userId) {
        return null
    }

    const user = db.user.findUnique({
        where: {
            id: userId
        }
    })
    return user
}