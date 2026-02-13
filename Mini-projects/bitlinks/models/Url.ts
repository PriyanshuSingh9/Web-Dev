import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    username: String,
    originalUrl: String,
    shortUrl: String,
})