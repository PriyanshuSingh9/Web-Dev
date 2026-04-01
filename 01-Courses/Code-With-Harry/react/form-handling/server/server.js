import express from "express"
import cors from "cors"

const app = express()
const port = 5000

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json())

app.post("/", (req, res) => {
    console.log(req.body)
    res.status(200).json({ message: "Chal rha hai" })
})

app.listen(port, () => {
    console.log(`App is listening at port ${port}`)
})