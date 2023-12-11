import React, {ChangeEvent, FC, useState} from 'react';
import {FilterType, TaskType, TodolistType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={onChangeTaskStatusHandler}
                />
                {/*<span className={task.isDone ? "task-done" : ''}>{task.taskTitle}</span>*/}
                <EditableSpan className={task.isDone ? "task-done" : ''} title={task.taskTitle}
                              callback={(newTitle: string) => updateTaskHandler(task.id, newTitle)}/>
                <button onClick={onClickDeleteTaskHandler}>X</button>
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
            <button onClick={onClickDeleteTodolistHandler}>X</button>

            <AddItemForm callback={addTaskHandler}/>

            {tasks.length
                ? <ul>{TaskList}</ul>
                : <span>Your todolist is empty!</span>
            }
            <div>
                <button className={filter === "all" ? "filter-active" : ''}
                        onClick={() => changeFilter(todolist.id, "all")}>All
                </button>
                <button className={filter === "active" ? "filter-active" : ''}
                        onClick={() => changeFilter(todolist.id, "active")}>Active
                </button>
                <button className={filter === "completed" ? "filter-active" : ''}
                        onClick={() => changeFilter(todolist.id, "completed")}>Completed
                </button>
            </div>
        </div>
    )
}