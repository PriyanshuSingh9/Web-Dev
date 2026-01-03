import express from "express"
import { addTask, deleteTask, updateTask } from "../controllers/list.controller.js";

const router = express.Router()

router.post("/:listId/tasks", addTask)
router.delete("/:listId/tasks/:taskId", deleteTask)
router.patch("/:listId/tasks/:taskId", updateTask)

export default router;