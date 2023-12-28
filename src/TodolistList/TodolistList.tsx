import React, {FC, useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {TodoList} from "../TodoList";
import {useAppDispatch, useAppSelector} from "../store/store";
import {addTodolistTC, getTodolistsTC, TodolistDomainType} from "../store/reducers/todolists-reducer";

type PropsType = {}

export const TodolistList: FC<PropsType> = () => {
    let todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, []);

    const addTodolist = useCallback((newTodolistTitle: string) => dispatch(addTodolistTC(newTodolistTitle)), [dispatch])

    return (
        <div>
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
                                    entityStatus={todolist.entityStatus}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}