import type { Meta, Story } from '@storybook/react'

import FailureCard from './FailureCard'
import type { FailureCardProps } from './FailureCard'

export default {
  component: FailureCard,
  title: 'Components/Card/Failure',
} as Meta

export const Default: Story<FailureCardProps> = (props) => (
  <FailureCard {...props} />
)
Default.args = {
  children: <p className="text">Oh shit! An error!</p>,
}
