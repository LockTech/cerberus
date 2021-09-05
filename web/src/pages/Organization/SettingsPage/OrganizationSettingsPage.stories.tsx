import type { Meta, Story } from '@storybook/react'

import { mockUpdateOrganization } from 'src/components/Organization/OrganizationUpdateCell/OrganizationUpdateCell.mock'

import OrganizationSettingsPage from './OrganizationSettingsPage'

export default {
  component: OrganizationSettingsPage,
  title: 'Pages/Organization/Settings',
} as Meta

export const Default: Story = (props) => {
  mockUpdateOrganization()

  return <OrganizationSettingsPage {...props} />
}
