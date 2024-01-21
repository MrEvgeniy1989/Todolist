import React, { FC, memo, useCallback } from "react"
import { CheckBox } from "components/Checkbox/Checkbox"
import { EditableSpan } from "components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { removeTaskTC, updateTaskTC } from "features/TodolistList/Todolist/Task/tasks-reducer"
import { TaskStatuses, TaskType } from "api/todolist-api"
import { useAppDispatch } from "hooks/useAppDispatch"

type PropsType = {
  todolistId: string
  task: TaskType
}

export const Task: FC<PropsType> = memo(({ todolistId, task }) => {
  const dispatch = useAppDispatch()

  const onChangeTaskStatusHandler = useCallback(
    (taskId: string, newTaskStatus: TaskStatuses) =>
      dispatch(updateTaskTC(todolistId, taskId, { status: newTaskStatus })),
    [todolistId, dispatch],
  )
  const updateTaskTitleHandler = useCallback(
    (taskId: string, newTitle: string) => dispatch(updateTaskTC(todolistId, taskId, { title: newTitle })),
    [todolistId, dispatch],
  )
  const onClickUpdateTaskTitleHandler = useCallback(
    (newTitle: string) => updateTaskTitleHandler(task.id, newTitle),
    [task.id, updateTaskTitleHandler],
  )
  const onClickDeleteTaskHandler = () => dispatch(removeTaskTC(todolistId, task.id))

  return (
    <li>
      <CheckBox
        checked={task.status !== TaskStatuses.New}
        callback={(value) => onChangeTaskStatusHandler(task.id, value)}
      />
      <EditableSpan
        className={task.status !== TaskStatuses.New ? "task-done" : ""}
        title={task.title}
        callback={onClickUpdateTaskTitleHandler}
      />

      <IconButton aria-label="deleteTask" onClick={onClickDeleteTaskHandler}>
        <Delete />
      </IconButton>
    </li>
  )
})
