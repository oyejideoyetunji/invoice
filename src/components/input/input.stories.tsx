import { Meta, Story } from '@storybook/react'
import React from 'react'
import { Input, InputComponentProps } from './index'

export default {
    title: 'Components/Input',
    component: Input,
    args: {
        label: 'email',
        error: '',
    },
} as Meta

const Template: Story<InputComponentProps> = (args: InputComponentProps) => (
    <Input {...args} />
)

export const DefaultInput = Template.bind({})
