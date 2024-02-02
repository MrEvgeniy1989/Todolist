import { MyButton } from "common/components/MyButton/MyButton"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { FilterType } from "features/todolistList/api/todolistsApi.types"
import { todolistsActions } from "features/todolistList/model/todolistsSlice"
import s from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/FilterTasksButtons/FilterTasksButtons.module.css"

type Props = {
  todolistId: string
  filter: FilterType
}

export const FilterTasksButtons = ({ todolistId, filter }: Props) => {
  const dispatch = useAppDispatch()

  const filterTasksHandler = (newFilter: FilterType) =>
    dispatch(
      todolistsActions.changeTodolistFilter({
        todolistId: todolistId,
        newFilter,
      }),
    )

  return (
    <div className={s.FilterTasksButtons}>
      <MyButton
        title={"All"}
        variant={filter === "all" ? "contained" : "outlined"}
        color={"success"}
        onClick={() => filterTasksHandler("all")}
      />
      <MyButton
        title={"Active"}
        variant={filter === "active" ? "contained" : "outlined"}
        color={"primary"}
        onClick={() => filterTasksHandler("active")}
      />
      <MyButton
        title={"Completed"}
        variant={filter === "completed" ? "contained" : "outlined"}
        color={"error"}
        onClick={() => filterTasksHandler("completed")}
      />
    </div>
  )
}
