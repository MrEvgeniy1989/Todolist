import React from 'react';
import './App.css';
import ButtonAppBar from "../ButtonAppBar";
import Container from '@mui/material/Container';
import LinearProgress from "@mui/material/LinearProgress";
import {TodolistList} from "../TodolistList/TodolistList";
import {useAppSelector} from "../store/store";
import {RequestStatusType} from "../store/reducers/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";


export const App = () => {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <TodolistList/>
            </Container>
        </div>
    )
}
