import React, {ChangeEvent, FC} from 'react';
import {FilterType, TaskType, TodolistType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Button from '@mui/material/Button'
import Checkbox from "@mui/material/Checkbox";

type TodoListType = {
    todolist: TodolistType
    tasks: TaskType[]
    filter: FilterType
    changeFilter: (todolistId: string, newFilter: FilterType) => void
    addTask: (todolistId: string, netTaskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newTaskStatus: boolean) => void
    deleteTask: (todolistId: string, taskId: string) => void
    deleteTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodoTitle: (todolistId: string, newTitle: string) => void
}


export const TodoList: FC<TodoListType> = ({
                                               todolist,
                                               tasks,
                                               filter,
                                               changeFilter,
                                               addTask,
                                               changeTaskStatus,
                                               deleteTask,
                                               deleteTodolist,
                                               updateTask,
                                               updateTodoTitle
                                           }) => {
    const updateTaskHandler = (taskId: string, newTitle: string) => updateTask(todolist.id, taskId, newTitle)

    const TaskList = tasks.map((task) => {
        const onClickDeleteTaskHandler = () => deleteTask(todolist.id, task.id)
        const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolist.id, task.id, event.currentTarget.checked)

        return (
            <li key={task.id}>
                {/*<input*/}
                {/*    type="checkbox"*/}
                {/*    checked={task.isDone}*/}
                {/*    onChange={onChangeTaskStatusHandler}*/}
                {/*/>*/}
                <Checkbox checked={task.isDone} onChange={onChangeTaskStatusHandler}/>
                <EditableSpan className={task.isDone ? "task-done" : ''} title={task.taskTitle}
                              callback={(newTitle: string) => updateTaskHandler(task.id, newTitle)}/>
                <IconButton aria-label="delete" onClick={onClickDeleteTaskHandler}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })


    const addTaskHandler = (newTaskTitle: string) => {
        addTask(todolist.id, newTaskTitle)
    }

    const onClickDeleteTodolistHandler = () => {
        deleteTodolist(todolist.id)
    }
    const updateTodoTitleHandler = (newTitle: string) => {
        updateTodoTitle(todolist.id, newTitle)
    }
    return (
        <div className={'todolist'}>
            <EditableSpan className={'todolistTitle'} title={todolist.todoTitle} callback={updateTodoTitleHandler}/>
            <IconButton aria-label="delete" onClick={onClickDeleteTodolistHandler}>
                <Delete/>
            </IconButton>

            <AddItemForm callback={addTaskHandler}/>

            {tasks.length
                ? <ul>{TaskList}</ul>
                : <span>Your todolist is empty!</span>
            }
            <div>
                <Button variant={filter === "all" ? 'contained' : "outlined"} color={'success'}
                        onClick={() => changeFilter(todolist.id, "all")}>All</Button>
                <Button variant={filter === "active" ? 'contained' : "outlined"} color={'primary'}
                        onClick={() => changeFilter(todolist.id, "active")}>Active</Button>
                <Button variant={filter === "completed" ? 'contained' : "outlined"} color={'error'}
                        onClick={() => changeFilter(todolist.id, "completed")}>Completed</Button>
            </div>
        </div>
    )
}