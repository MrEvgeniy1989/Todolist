import {
    addTodolistAC,
    changeFilterAC,
    changeTodoTitleAC,
    deleteTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from "./todolistsReducer";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string
let startState: TodolistDomainType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {
            id: todolistId1,
            title: "Что изучить",
            filter: 'all',
            addedDate: '',
            order: 0
        },
        {
            id: todolistId2,
            title: "Что купить",
            filter: 'all',
            addedDate: '',
            order: 0
        },
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(startState.length - 1)
    expect(endState[0].id).toBe(startState[1].id)
})

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, addTodolistAC('New Todolist'))

    expect(endState.length).toBe(startState.length + 1)
    expect(endState[0].title).toBe('New Todolist')
})

test('correct todolist should change its name', () => {

    const endState = todolistsReducer(startState, changeTodoTitleAC(todolistId1, 'new title'))

    expect(endState[0].title).toBe('new title')
    expect(endState.length).toEqual(startState.length)
})

test('correct filter of todolist should be changed', () => {
    const endState = todolistsReducer(startState, changeFilterAC(todolistId1, 'active'))

    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')
})