import mongoose from "mongoose";

const connectDB = async () => {
    // if there is already a connection established, return. This prevents multiple connections from being
    // created in development mode when Next.js hot reloads the server.
    if (mongoose.connections[0].readyState) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log("Connected to MongoDB");

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Failed to connect to the database")
    }
}

export default connectDB;