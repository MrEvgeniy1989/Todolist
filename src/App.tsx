import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type FilterType = "all" | "active" | "completed"
export type TaskType = {
    id: string
    isDone: boolean
    taskTitle: string
}
export type TodolistType = {
    id: string
    todoTitle: string
    filter: FilterType
}

export const App = () => {
    const todolistId1 = crypto.randomUUID()
    const todolistId2 = crypto.randomUUID()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, todoTitle: "Что изучить", filter: 'all'},
        {id: todolistId2, todoTitle: "Что купить", filter: 'all'},
    ])
    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: crypto.randomUUID(), taskTitle: "HTML", isDone: true},
            {id: crypto.randomUUID(), taskTitle: "CSS", isDone: true},
            {id: crypto.randomUUID(), taskTitle: "JS", isDone: true},
            {id: crypto.randomUUID(), taskTitle: "React", isDone: false},
            {id: crypto.randomUUID(), taskTitle: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: crypto.randomUUID(), taskTitle: "Milk", isDone: true},
            {id: crypto.randomUUID(), taskTitle: "Chocolate", isDone: false},
            {id: crypto.randomUUID(), taskTitle: "Bread", isDone: true},
            {id: crypto.randomUUID(), taskTitle: "Butter", isDone: true},
            {id: crypto.randomUUID(), taskTitle: "Banana", isDone: false}
        ]
    })

    const addTask = (todolistId: string, netTaskTitle: string) => {
        const newTask: TaskType = {id: crypto.randomUUID(), isDone: false, taskTitle: netTaskTitle}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskStatus = (todolistId: string, taskId: string, newTaskStatus: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map((task) => task.id === taskId ? {...task, isDone: newTaskStatus} : task)})
    }
    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId)})
    }

    const changeFilter = (todolistId: string, newFilter: FilterType) => {
        setTodolists(todolists.map((todolist) => todolist.id === todolistId ? {
            ...todolist,
            filter: newFilter
        } : todolist))
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
    }

    return (
        <div className="App">
            {todolists.map((todolist) => {
                let filteredTasks = tasks[todolist.id]
                if (todolist.filter === "active") {
                    filteredTasks = tasks[todolist.id].filter((task) => !task.isDone)
                } else if (todolist.filter === "completed") {
                    filteredTasks = tasks[todolist.id].filter((task) => task.isDone)
                }

                return (
                    <TodoList
                        key={todolist.id}
                        todolist={todolist}
                        tasks={filteredTasks}
                        filter={todolist.filter}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteTask={deleteTask}
                        deleteTodolist={deleteTodolist}
                    />
                )
            })}
        </div>
    )
}
