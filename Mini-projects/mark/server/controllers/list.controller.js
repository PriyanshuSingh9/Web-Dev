import List from "../models/list.js";

export const addTask = async (req, res) => {
    try {
        // we enclose listId here in brackets as we want to unpack the params object into listId
        const { listId } = req.params
        const { title } = req.body

        const result = await List.updateOne(
            { _id: listId },
            {
                $push: {
                    list_tasks: {
                        title,
                        completed: false
                    }
                }
            }
        );
        res.status(200).json({ message: "Task Added Succesfully" })
    } catch (error) {
        res.status(500).json({ message: "Failed to add task" })
    }
}

export const deleteTask = async (req, res) => {
    try {
        // we enclose listId and taskId here in brackets as we want to unpack the params object into listId and taskId
        const { listId, taskId } = req.params

        const result = await List.updateOne(
            { _id: listId },
            {
                $pull: {
                    list_tasks: { _id: taskId }
                }
            }
        );

        res.status(200).json({ message: "Task Deleted Succesfully" })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete task" })
    }
}

export const updateTask = async (req, res) => {
    try {
        const { listId, taskId } = req.params
        const updates = req.body

        const setObject = {}

        if (updates.title !== undefined) {
            setObject["list_tasks.$.title"] = updates.title
        }
        if (updates.completed !== undefined) {
            setObject["list_tasks.$.completed"] = updates.completed
        }
        await List.updateOne(
            {
                _id: listId,
                "list_tasks._id": taskId
            },
            {
                $set: setObject
            }
        )
        res.status(200).json({ message: "Task updated succesfully" })
    } catch (error) {
        res.status(500).json({ message: "Failed to update task" })
    }
}

// export const fetchList