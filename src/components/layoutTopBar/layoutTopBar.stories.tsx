import React from 'react'
import { Story, Meta } from '@storybook/react'
import LayoutTopBar from './index'

export default {
    title: 'Components/LayoutTopBar',
    component: LayoutTopBar,
    args: {},
} as Meta

const Template: Story = () => <LayoutTopBar />

export const DefaultLayoutTopBar = Template.bind({})
