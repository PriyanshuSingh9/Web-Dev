import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    language: String,
    price: Number,
    instructor: String
});

export const Course = mongoose.model("Course", courseSchema);