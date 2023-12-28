import React from 'react'
import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../store/reducers/todolists-reducer";
import {tasksReducer} from "../store/reducers/tasks-reducer";
import {v1} from "uuid";
import {Provider} from "react-redux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", todoTitle: "What to learn", filter: "all"},
        {id: "todolistId2", todoTitle: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), isDone: false, taskTitle: "CSS"},
            {id: v1(), isDone: true, taskTitle: "HTML"},
            {id: v1(), isDone: true, taskTitle: "JS"},
            {id: v1(), isDone: true, taskTitle: "React"},
            {id: v1(), isDone: false, taskTitle: "Redux"},
        ],
        ["todolistId2"]: [
            {id: v1(), isDone: false, taskTitle: "Milk"},
            {id: v1(), isDone: false, taskTitle: "Bread"},
            {id: v1(), isDone: false, taskTitle: "Butter"},
            {id: v1(), isDone: true, taskTitle: "Chocolate"},
            {id: v1(), isDone: false, taskTitle: "Banana"},
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}