import { Meta, Story } from '@storybook/react'
import React from 'react'
import LoginForm from '.'

export default {
    title: 'Components/LoginForm',
    component: LoginForm,
    args: {},
} as Meta

const Template: Story = () => <LoginForm />

export const DefaultLoginForm = Template.bind({})
