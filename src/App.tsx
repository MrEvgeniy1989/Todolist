import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import {addTaskAC, changeTaskStatusAC, deleteTaskAC, tasksReducer, updateTaskTitleAC} from "./reducers/tasksReducer";
import {
    addTodolistAC,
    changeFilterAC,
    deleteTodolistAC,
    todolistsReducer,
    changeTodoTitleAC
} from "./reducers/todolistsReducer";

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
export type initialStateTasksType = typeof initialStateTasks

const todolistId1 = crypto.randomUUID()
const todolistId2 = crypto.randomUUID()

const initialStateTodolists: TodolistType[] = [
    {id: todolistId1, todoTitle: "Что изучить", filter: 'all'},
    {id: todolistId2, todoTitle: "Что купить", filter: 'all'},
]

const initialStateTasks = {
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
}

export const App = () => {
    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, initialStateTodolists)
    const [tasks, dispatchTasks] = useReducer(tasksReducer, initialStateTasks)

    const addTask = (todolistId: string, netTaskTitle: string) => {
        // const newTask: TaskType = {id: crypto.randomUUID(), isDone: false, taskTitle: netTaskTitle}
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        dispatchTasks(addTaskAC(todolistId, netTaskTitle))
    }
    const changeTaskStatus = (todolistId: string, taskId: string, newTaskStatus: boolean) => {
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map((task) => task.id === taskId ? {...task, isDone: newTaskStatus} : task)
        // })
        dispatchTasks(changeTaskStatusAC(todolistId, taskId, newTaskStatus))
    }
    const deleteTask = (todolistId: string, taskId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId)})
        dispatchTasks(deleteTaskAC(todolistId, taskId))
    }
    const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, taskTitle: newTitle} : task)
        // })
        dispatchTasks(updateTaskTitleAC(todolistId, taskId, newTitle))
    }


    const changeFilter = (todolistId: string, newFilter: FilterType) => {
        // setTodolists(todolists.map((todolist) => todolist.id === todolistId ? {
        //     ...todolist,
        //     filter: newFilter
        // } : todolist))
        dispatchTodolists(changeFilterAC(todolistId, newFilter))
    }


    const deleteTodolist = (todolistId: string) => {
        // setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        // delete tasks[todolistId]
        dispatchTodolists(deleteTodolistAC(todolistId))
        dispatchTasks(deleteTodolistAC(todolistId))
    }

    const addTodolist = (newTodolistTitle: string) => {
        // const todolistId = crypto.randomUUID()
        // const newTodolist: TodolistType = {id: todolistId, todoTitle: newTodolistTitle, filter: 'all'}
        // setTodolists([newTodolist, ...todolists])
        // setTasks({...tasks, [todolistId]: []})
        const todolistId = crypto.randomUUID()
        dispatchTodolists(addTodolistAC(todolistId, newTodolistTitle))
        dispatchTasks(addTodolistAC(todolistId, newTodolistTitle))
    }


    const updateTodoTitle = (todolistId: string, newTitle: string) => {
        // setTodolists(todolists.map(todolist => todolist.id === todolistId ? {
        //     ...todolist,
        //     todoTitle: newTitle
        // } : todolist))
        dispatchTodolists(changeTodoTitleAC(todolistId, newTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{margin: '20px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>


                <Grid container>
                    {todolists.map((todolist) => {
                        let filteredTasks = tasks[todolist.id]
                        if (todolist.filter === "active") {
                            filteredTasks = tasks[todolist.id].filter((task) => !task.isDone)
                        } else if (todolist.filter === "completed") {
                            filteredTasks = tasks[todolist.id].filter((task) => task.isDone)
                        }

                        return (
                            <Grid item style={{margin: '20px'}} key={todolist.id}>
                                <Paper elevation={24} style={{padding: '20px'}}>
                                    <TodoList
                                        todolist={todolist}
                                        tasks={filteredTasks}
                                        filter={todolist.filter}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        deleteTask={deleteTask}
                                        deleteTodolist={deleteTodolist}
                                        updateTask={updateTask}
                                        updateTodoTitle={updateTodoTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}
