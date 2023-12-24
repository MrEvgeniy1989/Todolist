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
type updateTodoTitleACType = ReturnType<typeof changeTodolistTitleAC>
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
            return state.map((todolist) => todolist.id === action.todolistId ? {
                ...todolist,
                filter: action.newFilter
            } : todolist)
        case "DELETE_TODOLIST":
            return state.filter(todolist => todolist.id !== action.todolistId)
        case "ADD_TODOLIST":
            return [{...action.todolist, filter: "all"}, ...state]
        case "CHANGE_TODOLIST_TITLE":
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                title: action.newTodolistTitle
            } : todolist)
        default:
            return state
    }
}

// ActionCreators
export const setTodolists = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeFilterAC = (todolistId: string, newFilter: FilterType) => ({
    type: 'CHANGE_FILTER',
    todolistId,
    newFilter
} as const)
export const deleteTodolistAC = (todolistId: string) => ({type: 'DELETE_TODOLIST', todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD_TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => ({
    type: 'CHANGE_TODOLIST_TITLE',
    todolistId,
    newTodolistTitle
} as const)


// Thunks
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(deleteTodolistAC(todolistId))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.changeTodolistTitle(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}