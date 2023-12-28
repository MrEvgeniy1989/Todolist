import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {ReduxStoreProviderDecorator} from "../decorators/ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";


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
        // task: {id: '111', title: 'React', status: true}
        task: {
            id: '111',
            title: 'HardCode',
            description: '',
            todoListId: 'todolistId1',
            order: 0,
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            addedDate: '',
        }
    },
    decorators: [ReduxStoreProviderDecorator]
}

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsDoneStory: Story = {};

export const TaskIsNotDoneStory: Story = {
    args: {
        // task: {id: '222', title: 'React', isDone: false}
        task: {
            id: '222',
            title: 'React',
            description: '',
            todoListId: 'todolistId1',
            order: 0,
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            addedDate: '',
        }
    },
};

const TaskWork = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    if (!task) {
        // task = {id: '111', title: 'HardCode', status: TaskStatuses.New}
        task = {
            id: '111',
            title: 'HardCode',
            description: '',
            todoListId: 'todolistId1',
            order: 0,
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            addedDate: '',
        }
    }
    return (
        <Task todolistId={'todolistId1'} task={task}/>
    )
}

export const TaskWorkStory: Story = {
    render: () => <TaskWork/>
}