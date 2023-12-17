import type {Meta, StoryObj} from '@storybook/react';
import {EditableSpan} from "./EditableSpan";


const meta: Meta<typeof EditableSpan> = {
    title: 'Todolists/EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        callback: {
            description: 'Clicked change span',
            action: 'clicked'
        },
    },
    args: {
        title: 'EditableSpan',
        className: '',
    }
}

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {}