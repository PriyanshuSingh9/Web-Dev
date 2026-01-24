import { createContext } from "react";

import type { LoadContextType } from "../types";
import type { ErrorContextType } from "../types";

export const loadContext = createContext<LoadContextType>({
    loading: true,
    // An empty function. This is necessary because the type definition says setLoading must
    // be a function.If you didn't provide this, TypeScript would complain that the default value 
    // doesn't match LoadContextType.
    setLoading: () => { }
})


export const errorContext = createContext<ErrorContextType>({
    error: false,
    setError: () => { }
})