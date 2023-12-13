import React, {FC} from 'react';
import {FilterType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import Button from '@mui/material/Button'
import {CheckBox} from "./components/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, deleteTaskAC, updateTaskTitleAC} from "./state/reducers/tasksReducer";
import {changeFilterAC, changeTodoTitleAC, deleteTodolistAC} from "./state/reducers/todolistsReducer";

type TodoListType = {
    todolistId: string
    todoTitle: string
    filter: FilterType
}


export const TodoList: FC<TodoListType> = ({
                                               todolistId,
                                               todoTitle,
                                               filter,
                                           }) => {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    const updateTaskTitleHandler = (taskId: string, newTitle: string) => {
        dispatch(updateTaskTitleAC(todolistId, taskId, newTitle))
    }

    const onChangeTaskStatusHandler = (taskId: string, newTaskStatus: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, newTaskStatus))
    }

    if (filter === "active") {
        tasks = tasks.filter((task) => !task.isDone)
    } else if (filter === "completed") {
        tasks = tasks.filter((task) => task.isDone)
    }

    const TaskList = tasks.map((task) => {
        const onClickDeleteTaskHandler = () => {
            dispatch(deleteTaskAC(todolistId, task.id))
        }

        return (
            <li key={task.id}>
                <CheckBox checked={task.isDone} callback={(value) => onChangeTaskStatusHandler(task.id, value)}/>
                <EditableSpan className={task.isDone ? "task-done" : ''} title={task.taskTitle}
                              callback={(newTitle: string) => updateTaskTitleHandler(task.id, newTitle)}/>
                <IconButton aria-label="deleteTask" onClick={onClickDeleteTaskHandler}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })


    const addTaskHandler = (newTaskTitle: string) => {
        dispatch(addTaskAC(todolistId, newTaskTitle))
    }

    const onClickDeleteTodolistHandler = () => {
        dispatch(deleteTodolistAC(todolistId))
    }
    const changeTodoTitleHandler = (newTitle: string) => {
        dispatch(changeTodoTitleAC(todolistId, newTitle))
    }

    const onClickAllHandler = () => dispatch(changeFilterAC(todolistId, "all"));
    const onClickActiveHandler = () => dispatch(changeFilterAC(todolistId, "active"));
    const onClickCompletedHandler = () => dispatch(changeFilterAC(todolistId, "completed"));
    return (
        <div className={'todolist'}>
            <EditableSpan className={'todolistTitle'} title={todoTitle} callback={changeTodoTitleHandler}/>
            <IconButton aria-label="delete" onClick={onClickDeleteTodolistHandler}>
                <Delete/>
            </IconButton>

            <AddItemForm callback={addTaskHandler}/>

            {tasks.length
                ? <ul>{TaskList}</ul>
                : <span>Your todolist is empty!</span>
            }
            <div>
                <Button variant={filter === "all" ? 'contained' : "outlined"}
                        color={'success'}
                        onClick={onClickAllHandler}>All</Button>
                <Button variant={filter === "active" ? 'contained' : "outlined"}
                        color={'primary'}
                        onClick={onClickActiveHandler}>Active</Button>
                <Button variant={filter === "completed" ? 'contained' : "outlined"}
                        color={'error'}
                        onClick={onClickCompletedHandler}>Completed</Button>
            </div>
        </div>
    )
}