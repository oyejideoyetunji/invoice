import React from 'react'
import { Meta, Story } from '@storybook/react'
import LandingPageTopBar from './index'

export default {
    title: 'Components/LandingPageTopBar',
    component: LandingPageTopBar,
    args: {},
} as Meta

const Template: Story = () => <LandingPageTopBar />

export const DefaultLPageTopBar = Template.bind({})
