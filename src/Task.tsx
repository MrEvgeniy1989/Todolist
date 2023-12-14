import React, {FC, memo, useCallback} from 'react';
import {CheckBox} from "./components/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {TaskType} from "./App";
import {changeTaskStatusAC, deleteTaskAC, updateTaskTitleAC} from "./state/reducers/tasksReducer";
import {useDispatch} from "react-redux";

type PropsType = {
    todolistId: string
    task: TaskType
}

export const Task: FC<PropsType> = memo(({todolistId, task}) => {

    const dispatch = useDispatch()

    const onChangeTaskStatusHandler = useCallback((taskId: string, newTaskStatus: boolean) => dispatch(changeTaskStatusAC(todolistId, taskId, newTaskStatus)), [todolistId, dispatch])
    const updateTaskTitleHandler = useCallback((taskId: string, newTitle: string) => dispatch(updateTaskTitleAC(todolistId, taskId, newTitle)), [todolistId, dispatch])
    const onClickUpdateTaskTitleHandler = useCallback((newTitle: string) => updateTaskTitleHandler(task.id, newTitle),[]);
    const onClickDeleteTaskHandler = () => dispatch(deleteTaskAC(todolistId, task.id))

    return (
        <li>
            <CheckBox checked={task.isDone} callback={(value) => onChangeTaskStatusHandler(task.id, value)}/>
            <EditableSpan className={task.isDone ? "task-done" : ''} title={task.taskTitle}
                          callback={onClickUpdateTaskTitleHandler}/>
            <IconButton aria-label="deleteTask" onClick={onClickDeleteTaskHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})