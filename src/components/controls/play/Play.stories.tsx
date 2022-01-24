import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Play from './Play'

export default {
  title: 'Controls/Play',
  component: Play,
} as ComponentMeta<typeof Play>

const Template: ComponentStory<typeof Play> = (args) => <Play {...args} />

export const Playing = Template.bind({})
Playing.args = {
  isPlaying: true,
}

export const Paused = Template.bind({})
Paused.args = {
  isPlaying: false,
}

export const Color = Template.bind({})
Color.args = {
  color: 'skyblue',
}
