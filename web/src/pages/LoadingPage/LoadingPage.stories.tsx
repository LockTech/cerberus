import type { Meta, Story } from '@storybook/react'

import LoadingPage from './LoadingPage'

export default {
  component: LoadingPage,
  title: 'Pages/Loading',
} as Meta

export const Default: Story = (props) => {
  return <LoadingPage {...props} />
}
