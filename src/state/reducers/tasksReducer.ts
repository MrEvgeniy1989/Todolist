import {addTodolistACType, deleteTodolistACType, setTodolistsType} from "./todolistsReducer";
import {Dispatch} from "redux";
import {
    TaskPriorities,
    tasksAPI,
    TasksStateType,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType
} from "../../api/todolist-api";
import {AppRootStateType} from "../store";

type actionType =
    | deleteTaskACType
    | addTaskACType
    // | changeTaskStatusACType
    // | updateTaskTitleACType
    | deleteTodolistACType
    | addTodolistACType
    | setTodolistsType
    | setTasksType
    | updateTaskACType

type deleteTaskACType = ReturnType<typeof deleteTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
// type changeTaskStatusACType = ReturnType<typeof updateTaskStatusAC>
// type updateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>
type setTasksType = ReturnType<typeof setTasksAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: actionType): TasksStateType => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach((todolist: any) => {
                copyState[todolist.id] = []
            })
            return copyState
        }
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        case "ADD_TASK": {
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}
        }
        case 'DELETE_TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }
        case "UPDATE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, ...action.domainModel} : task)}
        }
        case "ADD_TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        case "DELETE_TODOLIST": {
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        }
        // case "CHANGE_TASK_STATUS": {
        //     return {
        //         ...state,
        //         [action.todolistId]: state[action.todolistId].map((task) => task.id === action.taskId ? {
        //             ...task,
        //             isDone: action.newTaskStatus
        //         } : task)
        //     }
        // }
        // case "UPDATE_TASK_TITLE": {
        //     return {
        //         ...state,
        //         [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
        //             ...task,
        //             taskTitle: action.payload.newTitle
        //         } : task)
        //     }
        // }
        default: {
            return state
        }
    }
}


// ActionCreators

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks} as const)
export const addTaskAC = (todolistId: string, task: TaskType) => ({type: 'ADD_TASK', todolistId, task} as const)
export const deleteTaskAC = (todolistId: string, taskId: string) => ({
    type: 'DELETE_TASK',
    payload: {todolistId, taskId}
} as const)
export const updateTaskAC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => ({
    type: 'UPDATE-TASK', todolistId,
    taskId,
    domainModel
} as const)
// export const updateTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => ({
//     type: 'UPDATE_TASK_TITLE',
//     payload: {todolistId, taskId, newTitle}
// } as const)
// export const updateTaskStatusAC = (todolistId: string, taskId: string, newTaskStatus: boolean) => ({
//     type: 'CHANGE_TASK_STATUS',
//     todolistId,
//     taskId,
//     newTaskStatus
// } as const)


// Thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(deleteTaskAC(todolistId, taskId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(todolistId, res.data.data.item))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(task => task.id === taskId)

    if (task) {
        let model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            startDate: task.startDate,
            priority: task.priority,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }

        tasksAPI.updateTask(todolistId, taskId, model)
            .then(() => {
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
            })
    }
}

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}