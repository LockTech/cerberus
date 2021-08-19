import type { Meta, Story } from '@storybook/react'

import DangerCard from './DangerCard'
import type { DangerCardProps } from './DangerCard'

export default {
  component: DangerCard,
  title: 'Components/Card/Danger',
} as Meta

export const Default: Story<DangerCardProps> = (props) => (
  <DangerCard {...props} />
)
