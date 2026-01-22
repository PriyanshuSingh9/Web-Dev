import express from "express";
import mongoose from "mongoose";
import passwordRoutes from "./routes/password.routes"

import cors from "cors"
import { error } from "console";

const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json())

app.use("/password", passwordRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/passop")
    .then(() => {
        console.log("MongoDB connected")

        app.listen(5000, () => {
            console.log("App is listening at port 5000")
        })
    })
    .catch((error) => {
        console.error(error)
    })

