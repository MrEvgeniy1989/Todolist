import React, { FC, memo, useCallback, useMemo } from "react"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { useSelector } from "react-redux"
import { todolistsActions } from "features/todolistList/model/todolistsSlice"
import { MyButton } from "common/components/MyButton/MyButton"
import { Task } from "features/todolistList/todolist/task/ui/Task/Task"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { AppRootStateType } from "app/store"
import { RequestStatusType } from "common/types/types"
import { TaskStatuses } from "common/enums/enums"
import { tasksThunks } from "features/todolistList/todolist/task/model/tasksSlice"
import { FilterType } from "features/todolistList/api/todolistsApi.types"
import { TaskType } from "features/todolistList/todolist/task/api/tasksApi.types"

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
    (newTaskTitle: string) => dispatch(tasksThunks.addTask({ todolistId, title: newTaskTitle })),
    [todolistId, dispatch],
  )
  const onClickDeleteTodolistHandler = useCallback(
    () => dispatch(todolistsActions.deleteTodolist(todolistId)),
    [todolistId, dispatch],
  )
  const changeTodoTitleHandler = useCallback(
    (title: string) => dispatch(todolistsActions.changeTodolistTitle({ todolistId, title })),
    [todolistId, dispatch],
  )

  const onClickAllHandler = useCallback(
    () =>
      dispatch(
        todolistsActions.changeTodolistFilter({
          todolistId: todolistId,
          newFilter: "all",
        }),
      ),
    [todolistId, dispatch],
  )
  const onClickActiveHandler = useCallback(
    () =>
      dispatch(
        todolistsActions.changeTodolistFilter({
          todolistId: todolistId,
          newFilter: "active",
        }),
      ),
    [todolistId, dispatch],
  )
  const onClickCompletedHandler = useCallback(
    () =>
      dispatch(
        todolistsActions.changeTodolistFilter({
          todolistId: todolistId,
          newFilter: "completed",
        }),
      ),
    [todolistId, dispatch],
  )
  return (
    <div className={"todolist"}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
        <EditableSpan className={"todolistTitle"} title={todoTitle} callback={changeTodoTitleHandler} />
        <IconButton aria-label="delete" onClick={onClickDeleteTodolistHandler} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </div>

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
