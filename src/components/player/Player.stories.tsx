import React from 'react'
import { Story, Meta } from '@storybook/react'
import Player from './Player'
import { PlayerProps } from './Player.types'

export default {
  title: 'Player/Player',
  component: Player,
  argTypes: {},
} as Meta<typeof Player>

const Template: Story<PlayerProps> = (args) => (
  <Player {...args} src="http://127.0.0.1:8099/rise.mp4" muted autoPlay loop />
)

export const Default = Template.bind({})
Default.args = {}

export const Native = Template.bind({})
Native.args = {
  nativeControls: true,
}
