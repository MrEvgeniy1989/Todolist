import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { TaskStatuses } from "common/enums/enums"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useAppSelector } from "common/hooks/useAppSelector"
import { RequestStatusType } from "common/types/types"
import { FilterType } from "features/todolistList/api/todolistsApi.types"
import { FilterTasksButtons } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/FilterTasksButtons/FilterTasksButtons"
import { selectorTasks } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/tasks/model/tasksSelectors"
import { tasksThunks } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/tasks/model/tasksSlice"
import { Tasks } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/tasks/ui/Tasks/Tasks"
import { TodolistTitle } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/TodolistTitle/TodolistTitle"
import { memo, useMemo } from "react"
import s from "./Todolist.module.css"

type Props = {
  todolistId: string
  todolistTitle: string
  filter: FilterType
  entityStatus: RequestStatusType
}

export const Todolist = memo(({ todolistId, todolistTitle, filter, entityStatus }: Props) => {
  let tasks = useAppSelector(selectorTasks(todolistId))
  const dispatch = useAppDispatch()

  const addTaskHandler = (newTaskTitle: string) => {
    return dispatch(tasksThunks.addTask({ todolistId, title: newTaskTitle })).unwrap()
  }

  tasks = useMemo(() => {
    let filteredTasks = tasks
    if (filter === "active") {
      filteredTasks = filteredTasks.filter((task) => task.status === TaskStatuses.New)
    } else if (filter === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.status === TaskStatuses.Completed)
    }
    return filteredTasks
  }, [filter, tasks])

  return (
    <div className={s.todolist}>
      <div>
        <TodolistTitle todolistId={todolistId} todolistTitle={todolistTitle} entityStatus={entityStatus} />
        <AddItemForm callback={addTaskHandler} disabled={entityStatus === "loading"} />
      </div>
      <Tasks todolistId={todolistId} tasks={tasks} />
      <FilterTasksButtons todolistId={todolistId} filter={filter} />
    </div>
  )
})
