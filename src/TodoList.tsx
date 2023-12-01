import React, {ChangeEvent, FC, useState} from 'react';
import {FilterType, TaskType} from "./App";

type TodoListType = {
    todoTitle: string
    tasks: TaskType[]
    filter: FilterType
    changeFilter: (newFilter: FilterType) => void
    addTask: (netTaskTitle: string) => void
    changeTaskStatus: (taskId: string, newTaskStatus: boolean) => void
    deleteTask: (taskId: string) => void
}


export const TodoList: FC<TodoListType> = ({
                                               todoTitle,
                                               tasks,
                                               filter,
                                               changeFilter,
                                               addTask,
                                               changeTaskStatus,
                                               deleteTask
                                           }) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState('')

    const TaskList = tasks.map((task) => {
        const onClickDeleteTaskHandler = () => deleteTask(task.id)
        const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, event.currentTarget.checked)

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
            addTask(newTaskTitle.trim())
        } else setError('Название задания не может быть пустым!')
        setNewTaskTitle('')
    };
    return (
        <div className={'todolist'}>
            <h3>{todoTitle}</h3>
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
                <button className={filter === "all" ? "filter-active" : ''} onClick={() => changeFilter("all")}>All
                </button>
                <button className={filter === "active" ? "filter-active" : ''}
                        onClick={() => changeFilter("active")}>Active
                </button>
                <button className={filter === "completed" ? "filter-active" : ''}
                        onClick={() => changeFilter("completed")}>Completed
                </button>
            </div>
        </div>
    )
}