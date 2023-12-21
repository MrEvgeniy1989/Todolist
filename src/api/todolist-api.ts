import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
})

export const todolistsAPI = {
    getTodos() {
        return instance.get<TodoListType[]>(`/todo-lists`)
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>(`/todo-lists`, {title})
    },
    deleteTodolist(todoListId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
    },
    updateTodo(todoListId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todoListId}`, {title})
    }
}
export const tasksAPI = {
    getTasks(todoListId: string) {
        return instance.get<TasksType>(`/todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType[] }>>(`/todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`, {title})
    }
}

type TodoListType = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}
type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}

type TaskType = {
    id: string,
    title: string,
    description: string | null,
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: Date | null,
    deadline: Date | null,
    addedDate: Date
}

type TasksType = {
    items: TaskType[],
    totalCount: number,
    error: string | null,
}