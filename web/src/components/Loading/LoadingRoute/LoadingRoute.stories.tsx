import { Meta, Story } from '@storybook/react'

import LoadingRoute from './LoadingRoute'

export default {
  component: LoadingRoute,
  title: 'Components/Loading/Route',
} as Meta

export const Default: Story = (props) => <LoadingRoute {...props} />
