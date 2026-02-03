import NextAuth from "next-auth"
import authConfig from "./auth.config"
import connectDB from "@/lib/db"
import User from "@/models/User"


export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "github" || account?.provider === "google") {
                await connectDB()
                const currentUser = await User.findOne({ email: user.email })

                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        username: user.email?.split("@")[0],
                        name: user.name,
                        image: user.image,
                    })
                    await newUser.save()
                }
            }
            return true
        },
        async session({ session, user }) {
            if (session.user) {
                await connectDB()
                const dbUser = await User.findOne({ email: session.user.email })
                if (dbUser) {
                    session.user.name = dbUser.username // Use username as display name if preferred
                    // You can add more fields to session here if needed
                }
            }
            return session
        }
    }
})