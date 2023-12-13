import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, deleteTaskAC, tasksReducer, updateTaskTitleAC} from "./tasksReducer";
import {TasksStateType} from "../App";
import {addTodolistAC, deleteTodolistAC} from "./todolistsReducer";

test('Correct Task should be remove', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState = {
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

    const endState = tasksReducer(startState, deleteTaskAC(todolistId1, startState[todolistId1][0].id))

    expect(endState[todolistId1].length).toBe(startState[todolistId1].length - 1)
    expect(endState[todolistId2].length).toBe(startState[todolistId2].length)
    expect(endState[todolistId1][0].id).not.toBe(startState[todolistId1][0].id)
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '2', taskTitle: 'milk', isDone: true},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    }

    const endState = tasksReducer(startState, addTaskAC('todolistId2', 'juce'))

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].taskTitle).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '2', taskTitle: 'milk', isDone: true},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    }

    const endState = tasksReducer(startState, changeTaskStatusAC('todolistId2', '2', false))

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '2', taskTitle: 'milk', isDone: false},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    })
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '2', taskTitle: 'milk', isDone: true},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    }

    const endState = tasksReducer(startState, updateTaskTitleAC('todolistId2', '2', '111'))

    expect(endState['todolistId2'][1].taskTitle).toBe('111')
    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '2', taskTitle: '111', isDone: true},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    })
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '2', taskTitle: 'milk', isDone: true},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '2', taskTitle: 'milk', isDone: true},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    }

    const action = deleteTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
