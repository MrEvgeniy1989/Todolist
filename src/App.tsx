import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import {addTodolistAC} from "./state/reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterType = "all" | "active" | "completed"
export type TaskType = {
    id: string
    isDone: boolean
    taskTitle: string
}
export type TodolistType = {
    id: string
    todoTitle: string
    filter: FilterType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {
    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = useCallback((newTodolistTitle: string) => dispatch(addTodolistAC(newTodolistTitle)), [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{margin: '20px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>


                <Grid container>
                    {todolists.map((todolist) => {
                        return (
                            <Grid item style={{margin: '20px'}} key={todolist.id}>
                                <Paper elevation={24} style={{padding: '20px'}}>
                                    <TodoList
                                        todolistId={todolist.id}
                                        todoTitle={todolist.todoTitle}
                                        filter={todolist.filter}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )
}
