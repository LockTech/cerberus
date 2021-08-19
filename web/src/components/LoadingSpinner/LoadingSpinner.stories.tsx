import { Meta, Story } from '@storybook/react'

import LoadingSpinner from './LoadingSpinner'
import type { LoadingSpinnerProps } from './LoadingSpinner'

export default {
  component: LoadingSpinner,
  title: 'Components/LoadingSpinner',
} as Meta

export const deafault: Story<LoadingSpinnerProps> = (props) => (
  <LoadingSpinner {...props} />
)
