import List from "../models/list.js";

export const createList = async (req, res) => {
    try {
        // extracting list name and description from request
        const { list_name, list_desc } = req.body
        const list = await List.create({
            list_name,
            list_desc,
            list_tasks: []
        });

        // status code 201 for creation of lists
        res.status(201).json({ message: `List created successfully with list ID: ${list._id}` })
    } catch (error) {
        res.status(500).json({ message: `Failed to create list ${error}` })
    }
}

export const deleteList = async (req, res) => {
    try {
        const { listId } = req.params

        const result = await List.deleteOne({ _id: listId })

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "List not found" });
        }
        res.status(200).json({ message: "Deleted list successfully" })
    } catch (error) {
        res.status(500).json({ message: `Failed to delete list ${error}` })
    }
}

export const fetchList = async (req, res) => {
    try {
        const lists = await List.find({})
        console.log(lists)
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: `Failed to find lists ${error}` })

    }
}

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
        res.status(500).json({ message: `Failed to add task ${error}` })
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
        res.status(500).json({ message: `Failed to delete task ${error}` })
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

        // if req.body is empty set object will be an empty object thus we have to setup a check for it
        if (Object.keys(setObject).length === 0) {
            return res.status(400).json({ message: "No fields provided to update" });
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
        res.status(500).json({ message: `Failed to update task ${error}` })
    }
}

// export const fetchList