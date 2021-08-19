import type { Meta, Story } from '@storybook/react'

import OrganizationSettingsDangerCard from './OrganizationSettingsDangerCard'

export default {
  component: OrganizationSettingsDangerCard,
  title: 'Components/Organization/DangerCard',
} as Meta

export const Default: Story = (props) => (
  <OrganizationSettingsDangerCard {...props} />
)
