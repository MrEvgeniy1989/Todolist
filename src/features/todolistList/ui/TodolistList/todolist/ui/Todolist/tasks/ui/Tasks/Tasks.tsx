import { TaskType } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/tasks/api/tasksApi.types"
import { Task } from "features/todolistList/ui/TodolistList/todolist/ui/Todolist/tasks/ui/Tasks/Task/Task"
import s from "./Tasks.module.css"

type Props = {
  todolistId: string
  tasks: TaskType[]
}

export const Tasks = ({ todolistId, tasks }: Props) => {
  return (
    <div className={s.tasks}>
      {tasks.length ? (
        <ul>
          {tasks.map((task) => (
            <Task key={task.id} todolistId={todolistId} task={task} />
          ))}
        </ul>
      ) : (
        <span className={s.tasksSpan}>Your todolist is empty!</span>
      )}
    </div>
  )
}
