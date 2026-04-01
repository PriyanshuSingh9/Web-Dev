"use server"

import Url from "../../models/Url"
import connectDB from "@/utils/connectDB"

export const shortenURL = async (originalUrl: string, shortUrl: string) => {
    try {
        await connectDB()
        if (await Url.findOne({ shortUrl: shortUrl })) {
            throw new Error("Short URL already exists. Please choose a different one.")
        }
        else {
            await Url.create({ originalUrl, shortUrl })
        }
        // Check if the short URL already exists
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to connect to the database")
    }
}
