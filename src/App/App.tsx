import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "../TodoList";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import ButtonAppBar from "../ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import {addTodolistTC, getTodolistsTC, TodolistDomainType} from "../state/reducers/todolistsReducer";
import {useAppDispatch, useAppSelector} from "../state/store";


export const App = () => {
    let todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, []);

    const addTodolist = useCallback((newTodolistTitle: string) => dispatch(addTodolistTC(newTodolistTitle)), [dispatch])

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
                                        todoTitle={todolist.title}
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
