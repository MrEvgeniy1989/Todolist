import React, {FC, memo, useCallback, useMemo} from 'react';
import {FilterType, TaskType} from "./App/App";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import Delete from "@mui/icons-material/Delete";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/reducers/tasksReducer";
import {changeFilterAC, changeTodoTitleAC, deleteTodolistAC} from "./state/reducers/todolistsReducer";
import {MyButton} from "./components/MyButton";
import {Task} from "./Task/Task";

type TodoListType = {
    todolistId: string
    todoTitle: string
    filter: FilterType
}


export const TodoList: FC<TodoListType> = memo(({
                                                    todolistId,
                                                    todoTitle,
                                                    filter,
                                                }) => {
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    tasks = useMemo(() => {
        console.log('useMemo')
        let filteredTasks = tasks
        if (filter === "active") {
            filteredTasks = filteredTasks.filter((task) => !task.isDone)
        } else if (filter === "completed") {
            filteredTasks = filteredTasks.filter((task) => task.isDone)
        }
        return filteredTasks
    }, [filter, tasks]);


    const TaskList = tasks.map((task) => {
        return (
            <Task key={task.id} todolistId={todolistId} task={task}/>
        )
    })

    const addTaskHandler = useCallback((newTaskTitle: string) => dispatch(addTaskAC(todolistId, newTaskTitle)), [todolistId, dispatch])
    const onClickDeleteTodolistHandler = useCallback(() => dispatch(deleteTodolistAC(todolistId)), [todolistId, dispatch])
    const changeTodoTitleHandler = useCallback((newTitle: string) => dispatch(changeTodoTitleAC(todolistId, newTitle)), [todolistId, dispatch])


    const onClickAllHandler = useCallback(() => dispatch(changeFilterAC(todolistId, "all")), [todolistId, dispatch])
    const onClickActiveHandler = useCallback(() => dispatch(changeFilterAC(todolistId, "active")), [todolistId, dispatch])
    const onClickCompletedHandler = useCallback(() => dispatch(changeFilterAC(todolistId, "completed")), [todolistId, dispatch])
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
                <MyButton title={'All'} variant={filter === "all" ? 'contained' : "outlined"} color={'success'} onClick={onClickAllHandler}/>
                <MyButton title={'Active'} variant={filter === "active" ? 'contained' : "outlined"} color={'primary'} onClick={onClickActiveHandler}/>
                <MyButton title={'Completed'} variant={filter === "completed" ? 'contained' : "outlined"} color={'error'} onClick={onClickCompletedHandler}/>
            </div>
        </div>
    )
})