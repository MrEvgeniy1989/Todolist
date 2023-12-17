import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import {Provider, useSelector} from "react-redux";
import {AppRootStateType, store} from "../state/store";
import {useState} from "react";
import {ReduxStoreProviderDecorator} from "../decorators/ReduxStoreProviderDecorator";
import {TaskType} from "../App/App";


const meta: Meta<typeof Task> = {
    title: 'Todolists/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {
        todolistId: '12321a',
        task: {id: '111', taskTitle: 'React', isDone: true}
    },
    decorators: [ReduxStoreProviderDecorator]
}

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {};

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: '222', taskTitle: 'React', isDone: false}
    },
};

const TaskWork = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    if (!task) {
        task = {id: '111', taskTitle: 'HardCode', isDone: false}
    }
    return (
        <Task todolistId={'todolistId1'} task={task}/>
    )
}

export const TaskWorkStory: Story = {
    render: () => <TaskWork/>
}