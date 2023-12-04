import React, {ChangeEvent, FC, useState} from 'react';
import {FilterType, TaskType, TodolistType} from "./App";

type TodoListType = {
    todolist: TodolistType
    tasks: TaskType[]
    filter: FilterType
    changeFilter: (todolistId: string, newFilter: FilterType) => void
    addTask: (todolistId: string, netTaskTitle: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, newTaskStatus: boolean) => void
    deleteTask: (todolistId: string, taskId: string) => void
    deleteTodolist: (todolistId: string) => void
}


export const TodoList: FC<TodoListType> = ({
                                               todolist,
                                               tasks,
                                               filter,
                                               changeFilter,
                                               addTask,
                                               changeTaskStatus,
                                               deleteTask,
                                               deleteTodolist
                                           }) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState('')

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
                <span className={task.isDone ? "task-done" : ''}>{task.taskTitle}</span>
                <button onClick={onClickDeleteTaskHandler}>X</button>
            </li>
        )
    })

    const onChangeNewTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError('')
        setNewTaskTitle(event.currentTarget.value)
    };
    const onClickAddTaskHandler = () => {
        if (newTaskTitle.trim()) {
            addTask(todolist.id, newTaskTitle.trim())
        } else setError('Название задания не может быть пустым!')
        setNewTaskTitle('')
    };

    const onClickDeleteTodolistHandler = () => {
        deleteTodolist(todolist.id)
    }
    return (
        <div className={'todolist'}>
            <h3>
                {todolist.todoTitle}
                <button onClick={onClickDeleteTodolistHandler}>X</button>
            </h3>

            <div>
                <input value={newTaskTitle} onChange={onChangeNewTaskTitleHandler}
                       className={error ? "input-error" : ''}/>
                <button onClick={onClickAddTaskHandler} disabled={!newTaskTitle}>+
                </button>
                <div>{error ? error : ''}</div>
            </div>

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