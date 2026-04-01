import Password from "../models/password";
import { Request, Response } from "express";


export const fetchPasswords = async (req: Request, res: Response) => {
    try {
        const passwords = await Password.find({})
        console.log(passwords)
        res.status(200).json(passwords)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch lists" })
    }
}

export const addPassword = async (req: Request, res: Response) => {
    try {
        const { url, username, password } = req.body
        const row = await Password.create({
            url,
            username,
            password
        })
        console.log(row)
        res.status(200).json(row)

    } catch (error) {
        res.status(500).json({ message: "Failed to create password" })
    }
}

export const deletePassword = async (req: Request, res: Response) => {
    try {
        const { passwordId } = req.params
        const result = await Password.deleteOne({
            _id: passwordId
        })
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "List not found" });
        }
        res.status(200).json({ message: "Deleted password successfully" })
    } catch (error) {
        res.status(500).json({ message: `Failed to password list ${error}` })
    }
}