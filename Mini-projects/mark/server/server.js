import express from "express"
import mongoose from "mongoose"
import list_routes from "./routes/list.routes.js"

import cors from "cors";


const app = express()

// allowing our frontend to interact with the backend
app.use(cors({
    origin: "http://localhost:5173"
}));

// middleware to parse into json
app.use(express.json())

// Any request that starts with /lists should be handled by listRoutes
app.use("/lists", list_routes)

mongoose
    .connect("mongodb://127.0.0.1:27017/mark")
    .then(() => {
        console.log("MongoDB connected")

        app.listen(5000, () => {
            console.log("App is listening at port 5000")
        })
    })
    .catch((err) => {
        console.error("MongoDB connection failed", err)
    });