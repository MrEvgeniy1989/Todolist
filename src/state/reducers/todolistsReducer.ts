import {v1} from "uuid";
import {Dispatch} from "redux";
import {FilterType, todolistsAPI, TodolistType} from "../../api/todolist-api";

type actionType =
    | changeFilterACType
    | deleteTodolistACType
    | addTodolistACType
    | updateTodoTitleACType
    | setTodolistsType

type changeFilterACType = ReturnType<typeof changeFilterAC>
export type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
type updateTodoTitleACType = ReturnType<typeof changeTodoTitleAC>
export type setTodolistsType = ReturnType<typeof setTodolists>

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: actionType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todolists.map((todolist: any) => ({...todolist, filter: 'all'}))
        case 'CHANGE_FILTER':
            return state.map((todolist) => todolist.id === action.payload.todolistId ? {
                ...todolist,
                filter: action.payload.newFilter
            } : todolist)
        case "DELETE_TODOLIST":
            return state.filter(todolist => todolist.id !== action.payload.todolistId)
        case "ADD_TODOLIST":
            return [{
                id: action.payload.todolistId,
                title: action.payload.newTodolistTitle,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        case "CHANGE_TODOLIST_TITLE":
            return state.map(todolist => todolist.id === action.payload.todolistId ? {
                ...todolist,
                todoTitle: action.payload.newTodolistTitle
            } : todolist)
        default:
            return state
    }
}

// ActionCreators
export const setTodolists = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)
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


// Thunks
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
        })
}