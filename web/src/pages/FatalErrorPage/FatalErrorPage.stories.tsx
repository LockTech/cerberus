import type { Meta, Story } from '@storybook/react'

import FatalErrorPage from './FatalErrorPage'

export default {
  component: FatalErrorPage,
  title: 'Pages/Error',
} as Meta

export const Default: Story = (props) => {
  return <FatalErrorPage {...props} />
}
