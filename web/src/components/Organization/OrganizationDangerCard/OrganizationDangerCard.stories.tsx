import type { Meta, Story } from '@storybook/react'

import OrganizationDangerCard from './OrganizationDangerCard'

export default {
  component: OrganizationDangerCard,
  title: 'Components/Organization/DangerCard',
} as Meta

export const Default: Story = (props) => <OrganizationDangerCard {...props} />
