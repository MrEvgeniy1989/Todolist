import {TodolistDomainType} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TasksStateType, TaskStatuses} from "../../api/todolist-api";

let todolistId1: string
let todolistId2: string

let startStateTodolists: TodolistDomainType[]
let startStateTasks: TasksStateType

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startStateTodolists = [
        {
            id: todolistId1,
            title: "Что изучить",
            filter: 'all',
            entityStatus: "idle",
            addedDate: '',
            order: 0
        },
        {
            id: todolistId2,
            title: "Что купить",
            filter: 'all',
            entityStatus: "idle",
            addedDate: '',
            order: 0
        },
    ]

    startStateTasks = {
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

test('ids should be equals', () => {
    // const action = addTodolistAC('new todolist')
    //
    // const endTasksState = tasksReducer(startStateTasks, action)
    // const endTodolistsState = todolistsReducer(startStateTodolists, action)
    //
    // const idFromTodolists = endTodolistsState[0].id
    // const idFromTasks = Object.hasOwn(endTasksState, idFromTodolists)
    //
    // expect(idFromTasks).toBe(true)
    // expect(idFromTodolists).toBe(action.payload.todolistId)
})
