import { Identifiable } from "./types";

export class DataManager<T extends Identifiable> {
    private items: T[] = [];

    addItems(item: T): void {
        this.items.push(item)
    }

    getItems(): T[] {
        return this.items
    }

    findById(id: number): T | undefined {
        return this.items.find(t => t.id === id)
    }

    // findByTitle(title: string): T | undefined {
    //     return this.items.find(t => t.title === title)
    // }

    updateItem(id: number, updates: Partial<T>) {
        let task = this.findById(id)
        if (task) {
            Object.assign(task, updates)
        }
    }

    getProperty<K extends keyof T>(id: number, key: K): T[K] | undefined {
        const item = this.findById(id)
        return item ? item[key] : undefined
    }
}