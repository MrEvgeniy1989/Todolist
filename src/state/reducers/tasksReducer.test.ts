import {v1} from "uuid";
import { deleteTaskAC, tasksReducer} from "./tasksReducer";
import {addTodolistAC, deleteTodolistAC} from "./todolistsReducer";
import {TaskPriorities, TasksStateType, TaskStatuses} from "../../api/todolist-api";

let todolistId1: string
let todolistId2: string
let startState: TasksStateType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML',
                description: '',
                todoListId: todolistId1,
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: v1(),
                title: 'CSS',
                description: '',
                todoListId: todolistId1,
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: v1(),
                title: 'JS',
                description: '',
                todoListId: todolistId1,
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: v1(),
                title: 'React',
                description: '',
                todoListId: todolistId1,
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: v1(),
                title: 'Redux',
                description: '',
                todoListId: todolistId1,
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Milk',
                description: '',
                todoListId: todolistId2,
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: v1(),
                title: 'Chocolate',
                description: '',
                todoListId: todolistId2,
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: v1(),
                title: 'Bread',
                description: '',
                todoListId: todolistId2,
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: v1(),
                title: 'Butter',
                description: '',
                todoListId: todolistId2,
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                id: v1(),
                title: 'Banana',
                description: '',
                todoListId: todolistId2,
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
        ]
    }
})

test('Correct Task should be remove', () => {
    const endState = tasksReducer(startState, deleteTaskAC(todolistId1, startState[todolistId1][0].id))

    expect(endState[todolistId1].length).toBe(startState[todolistId1].length - 1)
    expect(endState[todolistId2].length).toBe(startState[todolistId2].length)
    expect(endState[todolistId1][0].id).not.toBe(startState[todolistId1][0].id)
})

test('correct task should be added to correct array', () => {
    // const endState = tasksReducer(startState, addTaskAC(todolistId2, 'juce'))
    //
    // expect(endState[todolistId1].length).toBe(5)
    // expect(endState[todolistId2].length).toBe(6)
    // expect(endState[todolistId2][0].id).toBeDefined()
    // expect(endState[todolistId2][0].title).toBe('juce')
    // expect(endState[todolistId2][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    // const endState = tasksReducer(startState, updateTaskStatusAC(todolistId2, startState[todolistId2][1].id, true))
    //
    // expect(endState[todolistId2][1].status).toBe(TaskStatuses.Completed)
    // expect(endState[todolistId2].length).toBe(startState[todolistId2].length)
})

test('title of specified task should be changed', () => {
    // const endState = tasksReducer(startState, updateTaskTitleAC(todolistId2, startState[todolistId2][1].id, '111'))
    //
    // expect(endState[todolistId2][1].title).toBe('111')
})

test('new array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todolistId1 && k != todolistId2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC(todolistId2))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistId2]).not.toBeDefined()
})
