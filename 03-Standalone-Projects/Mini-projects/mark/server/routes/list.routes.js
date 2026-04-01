import express from "express"
import { addTask, deleteTask, updateTask, createList, deleteList, fetchList } from "../controllers/list.controller.js";

const router = express.Router()

// routes for lists
router.post("/", createList)
router.get("/", fetchList)
router.delete("/:listId", deleteList)

// routes for tasks
router.post("/:listId/tasks", addTask)
router.delete("/:listId/tasks/:taskId", deleteTask)
router.patch("/:listId/tasks/:taskId", updateTask)

export default router;