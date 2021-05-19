import { Meta, Story } from '@storybook/react'
import React from 'react'
import LoginForm, { LoginFormProps } from '.'

export default {
    title: 'Components/LoginForm',
    component: LoginForm,
    args: {
        onLoginSubmit: (data: { email: string; password: string }) => null,
    },
} as Meta

const Template: Story<LoginFormProps> = (args: LoginFormProps) => (
    <LoginForm {...args} />
)

export const DefaultLoginForm = Template.bind({})
