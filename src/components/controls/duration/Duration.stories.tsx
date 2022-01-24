import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Duration from './Duration'

export default {
  title: 'Controls/Duration',
  component: Duration,
} as ComponentMeta<typeof Duration>

const Template: ComponentStory<typeof Duration> = (args) => (
  <Duration {...args} />
)

export const Seconds = Template.bind({})
Seconds.args = {
  current: 5,
  total: 18,
}

export const Minutes = Template.bind({})
Minutes.args = {
  current: 66,
  total: 150,
}

export const Hours = Template.bind({})
Hours.args = {
  current: 3801,
  total: 6421,
}
