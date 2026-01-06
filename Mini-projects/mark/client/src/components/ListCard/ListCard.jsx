import { useState } from 'react'
import "./ListCard.css"

const ListCard = ({ list, onTaskAdd, onTaskUpdate, onTaskDelete, onListDelete }) => {
    const [taskTitle, setTaskTitle] = useState("")

    return (
        <div className="list">
            <div className="header">
                <div className="title">
                    {list.list_name}
                </div>
                <div className="delete-list">
                    <img src="client/src/assets/icons8-trash-24.png" alt="trash"
                        className='delete-icon'
                        onClick={() => {
                            onListDelete(list._id)
                        }

                        }
                    />
                </div>
            </div>
            {list.list_desc && <p className='desc'>{list.list_desc}</p>}

            {list.list_tasks.map(task => (
                <div key={task._id} className={`task ${task.completed ? "completed" : ""}`} >
                    <div className='task-content'>
                        <input type="checkbox" checked={task.completed} onChange={(() => {
                            // since we use the same function for updating both title and completion status we have to use 
                            // json format to sen the toggled completion value
                            onTaskUpdate(list._id, task._id, { completed: !task.completed })
                        })} />
                        {task.title}
                    </div>
                    <img src="client/src/assets/icons8-cross-50.png" alt="delete"
                        className='delete-icon'
                        onClick={(() => {
                            onTaskDelete(list._id, task._id)
                        })} />
                </div>
            ))
            }
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
