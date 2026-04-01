import connectDB from "@/utils/connectDB"
import Url from "../../models/Url"

export default async function getOriginalURL(shortUrl: string): Promise<string | null> {
    try {
        await connectDB()
        const urlDoc = await Url.findOne({ shortUrl: shortUrl })
        if (urlDoc) {
            return urlDoc.originalUrl
        }
        return null
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return null
    }
}
