import React from 'react'
import { Story, Meta } from '@storybook/react'
import LayoutTopBar from './index'
import { RouteComponentProps } from 'react-router'

export default {
    title: 'Components/LayoutTopBar',
    component: LayoutTopBar,
    args: {},
} as Meta

const Template: Story<RouteComponentProps> = (args: RouteComponentProps) => (
    <LayoutTopBar {...args} />
)

export const DefaultLayoutTopBar = Template.bind({})
