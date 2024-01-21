import React, { FC, memo, useCallback, useMemo } from "react"
import { AddItemForm } from "components/AddItemForm/AddItemForm"
import { EditableSpan } from "components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { useSelector } from "react-redux"
import { addTaskTC } from "features/TodolistList/Todolist/Task/tasks-reducer"
import {
  changeFilterAC,
  changeTodolistTitleTC,
  deleteTodolistTC,
} from "features/TodolistList/Todolist/todolists-reducer"
import { MyButton } from "components/MyButton/MyButton"
import { Task } from "features/TodolistList/Todolist/Task/Task"
import { FilterType, TaskStatuses, TaskType } from "api/todolist-api"
import { RequestStatusType } from "app/app-reducer"
import { useAppDispatch } from "hooks/useAppDispatch"
import { AppRootStateType } from "app/store"

type PropsType = {
  todolistId: string
  todoTitle: string
  filter: FilterType
  entityStatus: RequestStatusType
}

export const Todolist: FC<PropsType> = memo(({ todolistId, todoTitle, filter, entityStatus }) => {
  const dispatch = useAppDispatch()

  // useEffect(() => {
  //     dispatch(getTasksTC(todolistId))
  // }, [dispatch, todolistId]);

  let tasks = useSelector<AppRootStateType, TaskType[]>((state) => state.tasks[todolistId])

  tasks = useMemo(() => {
    let filteredTasks = tasks
    if (filter === "active") {
      filteredTasks = filteredTasks.filter((task) => task.status === TaskStatuses.New)
    } else if (filter === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.status === TaskStatuses.Completed)
    }
    return filteredTasks
  }, [filter, tasks])

  const TaskList = tasks.map((task) => {
    return <Task key={task.id} todolistId={todolistId} task={task} />
  })

  const addTaskHandler = useCallback(
    (newTaskTitle: string) => dispatch(addTaskTC(todolistId, newTaskTitle)),
    [todolistId, dispatch],
  )
  const onClickDeleteTodolistHandler = useCallback(() => dispatch(deleteTodolistTC(todolistId)), [todolistId, dispatch])
  const changeTodoTitleHandler = useCallback(
    (newTitle: string) => dispatch(changeTodolistTitleTC(todolistId, newTitle)),
    [todolistId, dispatch],
  )

  const onClickAllHandler = useCallback(() => dispatch(changeFilterAC(todolistId, "all")), [todolistId, dispatch])
  const onClickActiveHandler = useCallback(() => dispatch(changeFilterAC(todolistId, "active")), [todolistId, dispatch])
  const onClickCompletedHandler = useCallback(
    () => dispatch(changeFilterAC(todolistId, "completed")),
    [todolistId, dispatch],
  )
  return (
    <div className={"todolist"}>
      <EditableSpan className={"todolistTitle"} title={todoTitle} callback={changeTodoTitleHandler} />
      <IconButton aria-label="delete" onClick={onClickDeleteTodolistHandler} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>

      <AddItemForm callback={addTaskHandler} disabled={entityStatus === "loading"} />

      {tasks.length ? <ul>{TaskList}</ul> : <span>Your todolist is empty!</span>}
      <div>
        <MyButton
          title={"All"}
          variant={filter === "all" ? "contained" : "outlined"}
          color={"success"}
          onClick={onClickAllHandler}
        />
        <MyButton
          title={"Active"}
          variant={filter === "active" ? "contained" : "outlined"}
          color={"primary"}
          onClick={onClickActiveHandler}
        />
        <MyButton
          title={"Completed"}
          variant={filter === "completed" ? "contained" : "outlined"}
          color={"error"}
          onClick={onClickCompletedHandler}
        />
      </div>
    </div>
  )
})
