import React from 'react'
import { Story, Meta } from '@storybook/react'
import Slider from './Slider'
import { SliderProps } from './Slider.types'

export default {
  title: 'Common/Slider',
  component: Slider,
  argTypes: {},
} as Meta<typeof Slider>

const Template: Story<SliderProps> = (args) => <Slider {...args} />

export const Default = Template.bind({})
Default.args = {
  defaultValue: 25,
}

export const Controlled = Template.bind({})
Controlled.args = {
  value: 50,
}

export const Vertical = Template.bind({})
Vertical.args = {
  defaultValue: 70,
  direction: 'vertical',
}
