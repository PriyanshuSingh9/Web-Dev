import express from "express"
import { addPassword, deletePassword, fetchPasswords } from "../controllers/password.controller"
const router = express.Router()

router.get("/", fetchPasswords)
router.post("/", addPassword)
router.delete("/:passwordId", deletePassword)

export default router