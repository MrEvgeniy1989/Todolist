import {initialStateTasksType, TaskType} from "../App";
import {addTodolistACType, deleteTodolistACType} from "./todolistsReducer";

type actionType =
    | deleteTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | updateTaskACType
    | deleteTodolistACType
    | addTodolistACType

type deleteTaskACType = ReturnType<typeof deleteTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type updateTaskACType = ReturnType<typeof updateTaskTitleAC>

export const tasksReducer = (state: initialStateTasksType, action: actionType): initialStateTasksType => {
    switch (action.type) {
        case "ADD_TASK":
            const newTask: TaskType = {id: crypto.randomUUID(), isDone: false, taskTitle: action.payload.netTaskTitle}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case "CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((task) => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.newTaskStatus
                } : task)
            }
        case 'DELETE_TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((task) => task.id !== action.payload.taskId)
            }
        case "UPDATE_TASK_TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    taskTitle: action.payload.newTitle
                } : task)
            }
        case "DELETE_TODOLIST":
            delete state[action.payload.todolistId]
            return {...state}
        case "ADD_TODOLIST":
            return {...state, [action.payload.todolistId]: []}
        default:
            return state
    }
}

export const addTaskAC = (todolistId: string, netTaskTitle: string) => ({
    type: 'ADD_TASK',
    payload: {todolistId, netTaskTitle}
} as const)
export const changeTaskStatusAC = (todolistId: string, taskId: string, newTaskStatus: boolean) => ({
    type: 'CHANGE_TASK_STATUS',
    payload: {todolistId, taskId, newTaskStatus}
} as const)
export const deleteTaskAC = (todolistId: string, taskId: string) => ({
    type: 'DELETE_TASK',
    payload: {todolistId, taskId}
} as const)
export const updateTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => ({
    type: 'UPDATE_TASK_TITLE',
    payload: {todolistId, taskId, newTitle}
} as const)