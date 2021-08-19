import type { Meta, Story } from '@storybook/react'

import Sidebar from './Sidebar'

export default {
  component: Sidebar,
  title: 'Components/Sidebar',
} as Meta

export const Default: Story = (props) => <Sidebar {...props} />
