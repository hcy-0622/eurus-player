import React from 'react'
import { Story, Meta } from '@storybook/react'
import Volume from './Volume'
import { VolumeProps } from './Volume.types'

export default {
  title: 'Controls/Volume',
  component: Volume,
  argTypes: {},
} as Meta<typeof Volume>

const Template: Story<VolumeProps> = (args) => <Volume {...args} />

export const Default = Template.bind({})
Default.args = {
  value: 50,
}

export const Muted = Template.bind({})
Muted.args = {
  isMuted: true,
}
