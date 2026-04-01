export enum TaskStatus {
    Open = "open",
    InProgress = "active",
    Closed = "closed"
}

export interface Task {
    readonly id: number,
    title: string,
    status: TaskStatus,
    // status: "open" | "closed" | "in progress",
    // in place of unions we use an enum to reduce redundancy and improve code lifetime 
    tags?: {
        [key: string]: string
        // using dynamic indexing to create a tagging system
    }
    completedOn?: Date
}

export interface Identifiable {
    // title: string
    id: number
}

export interface EmailTask extends Task {
    recipient: string,
    subject: string
}
