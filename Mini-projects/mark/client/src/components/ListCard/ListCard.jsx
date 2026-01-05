import { useState } from 'react'
import "./ListCard.css"

const ListCard = ({ list, onTaskAdded }) => {
    const [taskTitle, setTaskTitle] = useState("")

    return (
        <div className="list">
            <div className="title">{list.list_name}</div>
            {list.list_desc && <p className='desc'>{list.list_desc}</p>}

            {list.list_tasks.map(task => (
                <div key={task._id} className="task">
                    {task.title}
                </div>
            ))}
            <div className="add-task">
                <input
                    type="text"
                    placeholder="Add a task..."
                    value={taskTitle}
                    // here e is the input element itself
                    onChange={e => setTaskTitle(e.target.value)}
                />
                <button onClick={() => {
                    onTaskAdded(list._id, taskTitle)
                    setTaskTitle("");
                }}>Add</button>
            </div>
        </div>
    )
}

export default ListCard
