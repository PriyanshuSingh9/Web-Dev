import express from "express"

const router = express.Router()

router.post("/:listId/tasks", addTask)

router.delete("/:listId/tasks/:taskId", deleteTask)

router.patch("/:listId/tasks/:taskId", updateTask)
