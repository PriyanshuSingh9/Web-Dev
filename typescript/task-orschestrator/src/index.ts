enum TaskStatus {
    Open = "open",
    InProgress = "active",
    Closed = "closed"
}

interface Task {
    readonly id: number,
    title: string,
    status: TaskStatus,
    // status: "open" | "closed" | "in progress",
    // in place of unions we use an enum to reduce redundancy and improve code lifetime 
    completedOn?: Date
}

let tasks: Task[] = [];

function createTask(title: string): Task {
    return {
        id: Date.now(),
        title: title,
        status: TaskStatus.Open
        // completedOn will only be added afer task status is closed
    }
}
const newTask = createTask("Check ECWoC projects")
tasks.push(newTask)

function getTask(id: number): Task | undefined {
    return tasks.find(t => t.id === id)
}

function completeTask(id: number): void {
    const task = getTask(id)
    if (task !== undefined) {
        task.status = TaskStatus.Closed
        task.completedOn = new Date()
        // task.completedOn= Date() gives an error because Date() returns a srting but we are expecting
        // a Date object thus we use the new operator for assignment
        console.log(`${task.title} is now completed`)
    }
    else {
        console.log(`Task not found`)
    }
}
// let projectConfig: [string, number, boolean] = ["Tyspescript Migration", 6, true]
// creating a tuple in ts

// [project name (string), total sprints (number), isActive (boolean)].

// function addTask(taskName: string) {
//     tasks.push(taskName)
//     console.log(`The total number of tasks now is ${taskName.length}`)
// }

// addTask(99)
// gives error because addTask can only take a string as an input