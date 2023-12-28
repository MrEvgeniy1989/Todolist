import type {Meta, StoryObj} from '@storybook/react';
import {App} from "./App";
import {ReduxStoreProviderDecorator} from "../decorators/ReduxStoreProviderDecorator";


const meta: Meta<typeof App> = {
    title: 'Todolists/App',
    component: App,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    decorators: [ReduxStoreProviderDecorator]
}

export default meta;
type Story = StoryObj<typeof App>;

export const AppStory: Story = {
    render: () => <App/>
}