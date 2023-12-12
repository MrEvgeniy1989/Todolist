import {addTodolistAC, changeFilterAC, changeTodoTitleAC, deleteTodolistAC, todolistsReducer} from "./todolistsReducer";
import {TodolistType} from "../App";
import {v1} from "uuid";

test('correct todolist should be removed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const initialStateTodolists: TodolistType[] = [
        {id: todolistId1, todoTitle: "Что изучить", filter: 'all'},
        {id: todolistId2, todoTitle: "Что купить", filter: 'all'},
    ]

    const endState = todolistsReducer(initialStateTodolists, deleteTodolistAC(todolistId1 ))

    expect(endState.length).toBe(initialStateTodolists.length - 1)
    expect(endState[0].id).toBe(initialStateTodolists[1].id)
})

test('correct todolist should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const initialStateTodolists: TodolistType[] = [
        {id: todolistId1, todoTitle: "Что изучить", filter: 'all'},
        {id: todolistId2, todoTitle: "Что купить", filter: 'all'},
    ]

    const endState = todolistsReducer(initialStateTodolists, addTodolistAC(v1(), 'New Todolist'))

    expect(endState.length).toBe(initialStateTodolists.length + 1)
    expect(endState[0].todoTitle).toBe('New Todolist')
})

test('correct todolist should change its name', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const initialStateTodolists: TodolistType[] = [
        {id: todolistId1, todoTitle: "Что изучить", filter: 'all'},
        {id: todolistId2, todoTitle: "Что купить", filter: 'all'},
    ]

    const endState = todolistsReducer(initialStateTodolists, changeTodoTitleAC(todolistId1, 'new title'))

    expect(endState[0].todoTitle).toBe('new title')
    expect(endState.length).toEqual(initialStateTodolists.length)
})

test('correct filter of todolist should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const initialStateTodolists: TodolistType[] = [
        {id: todolistId1, todoTitle: "Что изучить", filter: 'all'},
        {id: todolistId2, todoTitle: "Что купить", filter: 'all'},
    ]

    const endState = todolistsReducer(initialStateTodolists, changeFilterAC(todolistId1, 'active'))

    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')
})