// importing mongoose and express
import mongoose from "mongoose";
import express from "express";
// importing the schema from course .js
import { Course } from "./models/course.js"

// connecting mongoose to localhost and initialising express object
let client = await mongoose.connect("mongodb://localhost:27017/sigma")
const app = express()
const port = 3000

app.get('/', (req, res) => {
    // request to save a new entry in the db
    const course = new Course({ language: "Ruby", price: 1000, instructor: "DHH" })
    // course.save()
    res.send("Hello World")
})

app.get('/a', async (req, res) => {
    // request to find a matching document from the db
    const cpp = await Course.findOne({ language: "cpp" })
    res.json({ language: cpp.language, price: cpp.price, instructor: cpp.instructor })
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})


// you can add the script "dev": "nodemon main.js" in package.json folder inside the scirpt tag to run main file
// using npm run dev