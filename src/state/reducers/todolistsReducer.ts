import {FilterType, TasksStateType, TodolistType} from "../../App";
import {v1} from "uuid";

type actionType =
    | changeFilterACType
    | deleteTodolistACType
    | addTodolistACType
    | updateTodoTitleACType

type changeFilterACType = ReturnType<typeof changeFilterAC>
export type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
type updateTodoTitleACType = ReturnType<typeof changeTodoTitleAC>

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: actionType): TodolistType[] => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            return state.map((todolist) => todolist.id === action.payload.todolistId ? {
                ...todolist,
                filter: action.payload.newFilter
            } : todolist)
        case "DELETE_TODOLIST":
            return state.filter(todolist => todolist.id !== action.payload.todolistId)
        case "ADD_TODOLIST":
            const newTodolist: TodolistType = {
                id: action.payload.todolistId,
                todoTitle: action.payload.newTodolistTitle,
                filter: 'all'
            }
            return [newTodolist, ...state]
        case "CHANGE_TODOLIST_TITLE":
            return state.map(todolist => todolist.id === action.payload.todolistId ? {
                ...todolist,
                todoTitle: action.payload.newTodolistTitle
            } : todolist)
        default:
            return state
    }
}

export const changeFilterAC = (todolistId: string, newFilter: FilterType) => ({
    type: 'CHANGE_FILTER',
    payload: {todolistId, newFilter}
} as const)
export const deleteTodolistAC = (todolistId: string) => ({
    type: 'DELETE_TODOLIST',
    payload: {todolistId}
} as const)
export const addTodolistAC = (newTodolistTitle: string) => ({
    type: 'ADD_TODOLIST',
    payload: {todolistId: v1(), newTodolistTitle}
} as const)
export const changeTodoTitleAC = (todolistId: string, newTodolistTitle: string) => ({
    type: 'CHANGE_TODOLIST_TITLE',
    payload: {todolistId, newTodolistTitle}
} as const)