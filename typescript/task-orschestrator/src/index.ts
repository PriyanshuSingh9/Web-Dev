import { Task, EmailTask, TaskStatus } from "./types"
import { DataManager } from "./datamanager"

const TaskManager = new DataManager<Task>()
// let tasks: Task[] = [];

type TaskUpdateFields = Partial<Omit<Task, "id">>

function createTask(title: string): void {
    TaskManager.addItems({
        id: Date.now(),
        title: title,
        status: TaskStatus.Open
    })
    // return {
    //     id: Date.now(),
    //     title: title,
    //     status: TaskStatus.Open
    //     // completedOn will only be added afer task status is closed
    // }
}
createTask("Check ECWoC projects")
// tasks.push(newTask)



function isEmailTask(obj: any): obj is EmailTask {
    return (obj as EmailTask).recipient !== undefined
}

// Signature 1: If I pass a number, it's an ID
function getTask(id: number): Task | undefined;

// Signature 2: If I pass a string, it's a Title
// function getTask(title: string): Task | undefined;

function getTask(arg: number | string): Task | undefined {
    if (typeof (arg) === "number") {
        return TaskManager.findById(arg)
    }
    // else {
    //     return TaskManager.findByTitle(arg)
    // }
}

function completeTask(id: number): void {
    const task = TaskManager.findById(id)
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