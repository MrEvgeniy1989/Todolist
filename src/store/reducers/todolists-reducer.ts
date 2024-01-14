import {Dispatch} from "redux";
import {FilterType, todolistsAPI, TodolistType} from "../../api/todolist-api";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {getTasksTC} from "./tasks-reducer";

type ActionType =
    | ChangeFilterACType
    | DeleteTodolistACType
    | AddTodolistACType
    | UpdateTodoTitleACType
    | SetTodolistsType
    | ChangeTodolistEntityStatusACType
    | ClearTodolistsDataACType

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type UpdateTodoTitleACType = ReturnType<typeof changeTodolistTitleAC>
export type SetTodolistsType = ReturnType<typeof setTodolists>
export type ChangeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
export type ClearTodolistsDataACType = ReturnType<typeof clearTodolistsDataAC>

export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todolists.map(todolist => ({...todolist, filter: 'all', entityStatus: 'idle'}))
        case 'CHANGE_FILTER':
            return state.map((todolist) => todolist.id === action.todolistId ? {
                ...todolist,
                filter: action.newFilter
            } : todolist)
        case "DELETE_TODOLIST":
            return state.filter(todolist => todolist.id !== action.todolistId)
        case "ADD_TODOLIST":
            return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]
        case "CHANGE_TODOLIST_TITLE":
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                title: action.newTodolistTitle
            } : todolist)
        case "CHANGE-ENTITY-STATUS": {
            return state.map(todolist => todolist.id === action.todolistId ? {
                ...todolist,
                entityStatus: action.entityStatus
            } : todolist)
        }
        case "CLEAR-DATA": {
            return []
        }
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
export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-ENTITY-STATUS',
    todolistId,
    entityStatus
} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD_TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => ({
    type: 'CHANGE_TODOLIST_TITLE',
    todolistId,
    newTodolistTitle
} as const)
export const clearTodolistsDataAC = () => ({type: 'CLEAR-DATA'} as const)

// Thunks
export const getTodolistsTC = () => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
            dispatch(setAppStatusAC('succeeded'))
            return res.data
        })
        .then(todolists => {
            todolists.forEach(todolist => {
                dispatch(getTasksTC(todolist.id))
            })
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(deleteTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Обратитесь в службу поддержки.'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch(err => {
            dispatch(setAppErrorAC(err.message))
            dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
            dispatch(setAppStatusAC('failed'))
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.changeTodolistTitle(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}