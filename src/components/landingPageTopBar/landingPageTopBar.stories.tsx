import React from 'react'
import { Meta, Story } from '@storybook/react'
import LandingPageTopBar, { LandingPageTopBarProps } from './index'

export default {
    title: 'Components/LandingPageTopBar',
    component: LandingPageTopBar,
    args: {
        onShowLoginModal: () => null,
    },
} as Meta

const Template: Story<LandingPageTopBarProps> = (
    args: LandingPageTopBarProps
) => <LandingPageTopBar {...args} />

export const DefaultLPageTopBar = Template.bind({})
