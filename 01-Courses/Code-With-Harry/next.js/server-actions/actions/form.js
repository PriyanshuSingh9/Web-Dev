"use server"
// here we have to declare use server so as to make sure no sensitive information goes into the client side
import fs from "fs/promises"

const submitAction = async (e) => {
    console.log(e.get("name"), e.get("address"))
    fs.writeFile("harry.txt", "hello world")
}

export default submitAction