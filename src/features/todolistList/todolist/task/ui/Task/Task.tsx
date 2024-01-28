import React, { FC, memo, useCallback } from "react"
import { CheckBox } from "common/components/Checkbox/Checkbox"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { tasksThunks } from "features/todolistList/todolist/task/model/tasksSlice"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { TaskStatuses } from "common/enums/enums"
import { TaskType } from "features/todolistList/todolist/task/api/tasksApi.types"

type PropsType = {
  todolistId: string
  task: TaskType
}

export const Task: FC<PropsType> = memo(({ todolistId, task }) => {
  const dispatch = useAppDispatch()

  const onChangeTaskStatusHandler = useCallback(
    (taskId: string, newTaskStatus: TaskStatuses) =>
      dispatch(tasksThunks.updateTask({ todolistId, taskId, domainModel: { status: newTaskStatus } })),
    [todolistId, dispatch],
  )
  const updateTaskTitleHandler = useCallback(
    (taskId: string, newTitle: string) =>
      dispatch(
        tasksThunks.updateTask({
          todolistId,
          taskId,
          domainModel: { title: newTitle },
        }),
      ),
    [todolistId, dispatch],
  )
  const onClickUpdateTaskTitleHandler = useCallback(
    (newTitle: string) => updateTaskTitleHandler(task.id, newTitle),
    [task.id, updateTaskTitleHandler],
  )
  const onClickDeleteTaskHandler = () => dispatch(tasksThunks.removeTask({ todolistId, taskId: task.id }))

  return (
    <li style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <CheckBox
          checked={task.status !== TaskStatuses.New}
          callback={(value) => onChangeTaskStatusHandler(task.id, value)}
        />
        <EditableSpan
          className={task.status !== TaskStatuses.New ? "task-done" : ""}
          title={task.title}
          callback={onClickUpdateTaskTitleHandler}
        />
      </div>

      <IconButton aria-label="deleteTask" onClick={onClickDeleteTaskHandler}>
        <Delete />
      </IconButton>
    </li>
  )
})
