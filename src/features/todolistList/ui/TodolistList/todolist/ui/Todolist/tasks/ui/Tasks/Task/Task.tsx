import Delete from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { CheckBox } from "common/components/Checkbox/Checkbox"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { TaskStatuses } from "common/enums/enums"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { TaskType } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/tasks/api/tasksApi.types"
import { tasksThunks } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/tasks/model/tasksSlice"
import { memo, useCallback } from "react"
import s from "./Task.module.css"

type Props = {
  todolistId: string
  task: TaskType
}

export const Task = memo(({ todolistId, task }: Props) => {
  const dispatch = useAppDispatch()

  const taskStatusHandler = useCallback(
    (taskId: string, newTaskStatus: TaskStatuses) =>
      dispatch(tasksThunks.updateTask({ todolistId, taskId, domainModel: { status: newTaskStatus } })),
    [todolistId, dispatch],
  )
  const updateTaskTitleHandler = useCallback(
    (newTitle: string) =>
      dispatch(
        tasksThunks.updateTask({
          todolistId,
          taskId: task.id,
          domainModel: { title: newTitle },
        }),
      ),
    [todolistId, task.id, dispatch],
  )
  const deleteTaskHandler = () => dispatch(tasksThunks.removeTask({ todolistId, taskId: task.id }))

  return (
    <li className={s.task}>
      <div>
        <CheckBox checked={task.status !== TaskStatuses.New} callback={(value) => taskStatusHandler(task.id, value)} />
        <EditableSpan
          className={task.status !== TaskStatuses.New ? s.taskDone : ""}
          title={task.title}
          callback={updateTaskTitleHandler}
        />
      </div>

      <IconButton aria-label="deleteTask" onClick={deleteTaskHandler}>
        <Delete />
      </IconButton>
    </li>
  )
})
