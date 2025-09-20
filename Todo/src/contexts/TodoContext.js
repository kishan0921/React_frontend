// Note: context me mujhe return warega kuch nhi mil raha hai, issliye maine isska name 
// .js file rakha hai.

// App agar aapko wo provider. waala drama ni krna hai,
// to mujhe 2 chize need hogi yaha pe, createContext and useContext issko import kr lete h
// and ye sab react se aayega.
import {createContext, useContext} from "react"

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: " Todo msg",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})


export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider
