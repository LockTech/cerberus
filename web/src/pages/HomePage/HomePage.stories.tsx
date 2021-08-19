import type { Meta, Story } from '@storybook/react'

import HomePage from './HomePage'

export default {
  component: HomePage,
  title: 'Pages/Dashboard',
} as Meta

export const Default: Story = (props) => {
  return <HomePage {...props} />
}
