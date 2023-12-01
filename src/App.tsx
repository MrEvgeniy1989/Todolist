import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: string
    isDone: boolean
    taskTitle: string
}
export type FilterType = "all" | "active" | "completed"

export const App = () => {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: crypto.randomUUID(), isDone: true, taskTitle: "HTML"},
        {id: crypto.randomUUID(), isDone: true, taskTitle: "CSS"},
        {id: crypto.randomUUID(), isDone: false, taskTitle: "React"},
        {id: crypto.randomUUID(), isDone: false, taskTitle: "Redux"}
    ])
    const [filter, setFilter] = useState<FilterType>('all')

    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter((task) => !task.isDone)
    } else if (filter === "completed") {
        filteredTasks = tasks.filter((task) => task.isDone)
    }

    const changeFilter = (newFilter: FilterType) => {
        setFilter(newFilter)
    }

    const addTask = (netTaskTitle: string) => {
        const newTask: TaskType = {id: crypto.randomUUID(), isDone: false, taskTitle: netTaskTitle}
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, newTaskStatus: boolean) => {
        setTasks(tasks.map((task) => task.id === taskId ? {...task, isDone: newTaskStatus} : task))
    }
    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }

    return (
        <div className="App">
            <TodoList
                todoTitle={"Что изучить"}
                tasks={filteredTasks}
                filter={filter}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                deleteTask={deleteTask}
            />
        </div>
    )
}
