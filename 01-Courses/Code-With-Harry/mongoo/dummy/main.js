import mongoose from "mongoose";
import express from "express";

import { Employee } from "./models/dummy.js"

let client = await mongoose.connect("mongodb://localhost:27017/Company")
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


function getName() {
    const first = names[Math.floor(Math.random() * names.length)];
    const last = surnames[Math.floor(Math.random() * surnames.length)];
    return (`${first} ${last}`);
}
function getCity() {
    return cities[Math.floor(Math.random() * cities.length)]
}
function getSalary() {
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
    res.sendFile('index.html', { root: "public" })
})

app.post('/', async (req, res) => {
    try {
        const arr = []
        for (let i = 0; i < 10; i++) {
            const salary = getSalary()
            const employee = { name: getName(), city: getCity(), salary: salary, isManager: manager(salary) }
            // await employee.save()
            // instead of using employee.save to add to the database one by one we use an array and insertMany
            arr.push(employee)
        }
        const inserted = await Employee.insertMany(arr)
        res.status(201).json({ message: "Inserted 10 employees", count: inserted.length });
    } catch (err) {
        console.error("Insert error:", err);
        res.status(500).json({ error: "Failed to insert employees" });
    }
})

app.listen(port, () => {
    console.log(`Page is active at ${port}`)
})