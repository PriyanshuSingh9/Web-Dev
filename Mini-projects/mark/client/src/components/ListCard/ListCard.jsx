import { useState } from 'react'
import "./ListCard.css"

const ListCard = ({ list, onTaskAdd, onTaskUpdate, onTaskDelete, onListDelete }) => {
    // states for managing tasks
    const [taskTitle, setTaskTitle] = useState("")
    const [editingTaskId, setEditingTaskId] = useState(null)
    const [editedTitle, setEditedTitle] = useState("")

    return (
        <div className="list">
            {/* Header for the list card */}
            <div className="header">
                <div className="title">
                    {list.list_name}
                </div>
                {/* Delete button for the list */}
                <div className="delete-list">
                    <img src="client/src/assets/icons8-trash-24.png" alt="trash"
                        className='delete-icon'
                        onClick={() => {
                            if (window.confirm(`Are you sure you want to delete list: ${list.list_name}`)) {
                                onListDelete(list._id)
                            }
                        }

                        }
                    />
                </div>
            </div>
            {list.list_desc && <p className='desc'>{list.list_desc}</p>}

            {/* mapping all tasks */}
            {list.list_tasks.map(task => (
                <div key={task._id} className={`task ${task.completed ? "completed" : ""}`} >
                    {
                        // if a task is in editing mode render input feild
                        editingTaskId === task._id ?
                            <input type="text"
                                className='task-edit-input'
                                value={editedTitle}
                                placeholder={task.title}
                                autoFocus
                                onChange={(e) => {
                                    setEditedTitle(e.target.value)
                                }}
                                // when out of focus update the task
                                onBlur={() => {
                                    if (editedTitle && editedTitle.trim() !== task.title) {
                                        onTaskUpdate(list._id, task._id, { title: editedTitle, completed: false })
                                    }
                                    setEditingTaskId(null)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key == "Enter") {
                                        e.target.blur()
                                    }
                                    if (e.key == "Escape") {
                                        setEditingTaskId(null)
                                    }
                                }} />
                            :
                            // if not in editing mode render the task
                            <div className='task-content'>
                                <input type="checkbox" checked={task.completed} onChange={(() => {
                                    // since we use the same function for updating both title and completion status we have to use 
                                    // json format to sen the toggled completion value
                                    onTaskUpdate(list._id, task._id, { completed: !task.completed })
                                })} />
                                <div className="title"
                                    onClick={() => {
                                        setEditingTaskId(task._id)
                                    }}
                                    onBlur={() => {
                                        setEditingTaskId(null)
                                    }}
                                >
                                    {task.title}
                                </div>
                            </div>
                    }
                    {/* Delete button for each task */}
                    <img src="client/src/assets/icons8-cross-50.png" alt="delete"
                        className='delete-icon'
                        onClick={(() => {
                            if (window.confirm(`Are you sure you want to delete task: ${task.title}`)) {
                                onTaskDelete(list._id, task._id)
                            }
                        })} />
                </div>
            ))
            }
            {/* Add task input and button */}
            <div className="add-task">
                <input
                    type="text"
                    placeholder="Add a task..."
                    value={taskTitle}
                    // here e is the input element itself
                    onChange={e => setTaskTitle(e.target.value)}
                />
                <button onClick={() => {
                    onTaskAdd(list._id, taskTitle)
                    setTaskTitle("");
                }}>Add</button>
            </div>
        </div >
    )
}

export default ListCard
