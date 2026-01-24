import type { Dispatch, SetStateAction } from "react"

export type passwordEntry = {
    url: string,
    username: string,
    password: string
}

export interface LoadContextType {
    loading: boolean,
    // Dispatch is a generic type for a function that "sends" an update.In the context of useState, it 
    // describes the function itself.
    // SetStateAction<> represents the value you pass into a setter function
    setLoading: Dispatch<SetStateAction<boolean>>
}

export interface ErrorContextType {
    error: boolean,
    setError: Dispatch<SetStateAction<boolean>>
}