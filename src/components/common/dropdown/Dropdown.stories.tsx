import React from 'react'
import { Story, Meta } from '@storybook/react'
import Dropdown from './Dropdown'
import { DropdownProps } from './Dropdown.types'

export default {
  title: 'Common/Dropdown',
  component: Dropdown,
  argTypes: {},
} as Meta<typeof Dropdown>

const Template: Story<DropdownProps> = (args) => (
  <Dropdown {...args}>
    <span>Dropdown</span>
  </Dropdown>
)

export const Default = Template.bind({})
Default.args = {
  overlay: (
    <ul>
      <li>测试111</li>
      <li>测试222</li>
      <li>测试333</li>
    </ul>
  ),
}
