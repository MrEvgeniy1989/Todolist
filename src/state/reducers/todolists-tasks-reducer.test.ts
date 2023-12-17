import {TasksStateType, TodolistType} from "../../App/App";
import {addTodolistAC, todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string

let startStateTodolists: TodolistType[]
let startStateTasks: TasksStateType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startStateTodolists = [
        {id: todolistId1, todoTitle: "Что изучить", filter: 'all'},
        {id: todolistId2, todoTitle: "Что купить", filter: 'all'},
    ]

    startStateTasks = {
        [todolistId1]: [
            {id: v1(), taskTitle: "HTML", isDone: true},
            {id: v1(), taskTitle: "CSS", isDone: true},
            {id: v1(), taskTitle: "JS", isDone: true},
            {id: v1(), taskTitle: "React", isDone: false},
            {id: v1(), taskTitle: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), taskTitle: "Milk", isDone: true},
            {id: v1(), taskTitle: "Chocolate", isDone: false},
            {id: v1(), taskTitle: "Bread", isDone: true},
            {id: v1(), taskTitle: "Butter", isDone: true},
            {id: v1(), taskTitle: "Banana", isDone: false}
        ]
    }
})

test('ids should be equals', () => {
    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startStateTasks, action)
    const endTodolistsState = todolistsReducer(startStateTodolists, action)

    const idFromTodolists = endTodolistsState[0].id
    const idFromTasks = Object.hasOwn(endTasksState, idFromTodolists)

    expect(idFromTasks).toBe(true)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})
