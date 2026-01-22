import mongoose from "mongoose"

const password = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    pasword: {
        type: String,
        required: true
    }
})

export default mongoose.model("password", password)