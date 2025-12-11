import mongoose from "mongoose";
import express from "express";

// import employee from "./models/dummy"

let client = await mongoose.connect("mongodb://localhost:27017/")
let app = express()
let port = 3000

app.use(express.static("public"))

const names = [
    "Aarav",
    "Vivaan",
    "Ishaan",
    "Rohan",
    "Kabir",
    "Aditya",
    "Samar",
    "Arjun",
    "Dev",
    "Krish"
];

const surnames = [
    "Sharma",
    "Verma",
    "Singh",
    "Patel",
    "Gupta",
    "Reddy",
    "Nair",
    "Choudhary",
    "Mehta",
    "Joshi"
];
const cities = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow"
];


function name() {
    const first = names[Math.floor(Math.random() * names.length)];
    const last = surnames[Math.floor(Math.random() * surnames.length)];
    return (`${first} ${last}`);
}
function city() {
    return cities[Math.floor(Math.random() * cities.length)]
}
function salary() {
    return (10000 * (1 + Math.floor(Math.random() * 10)))
}
function manager(salary) {
    if (salary >= 80000) {
        return true
    }
    else {
        return false
    }
}

app.get('/', (req, res) => {
    res.sendFile('index', { root: "public" })
})

app.post('/', async (req, res) => {
    for (let i = 0; i <= 10; i++) {

    }
})

app.listen(port, () => {
    console.log(`Page is active at ${port}`)
})