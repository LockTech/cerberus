import type { Meta, Story } from '@storybook/react'

import NotFoundPage from './NotFoundPage'

export default {
  component: NotFoundPage,
  title: 'Pages/NotFound',
} as Meta

export const Default: Story = (props) => {
  return <NotFoundPage {...props} />
}
