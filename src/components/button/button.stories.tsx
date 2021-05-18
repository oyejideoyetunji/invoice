import React from 'react'
import { Meta, Story } from '@storybook/react'
import Button, { ButtonProps } from './index'

export default {
    title: 'Components/Button',
    component: Button,
    args: {
        primary: true,
        size: 'small',
    },
} as Meta

const Template: Story<ButtonProps> = (args: ButtonProps) => (
    <Button {...args}>Click me</Button>
)

export const DefaultButton = Template.bind({})
