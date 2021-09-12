import type { Meta, Story } from '@storybook/react'

import { mockUpdateOrganization } from 'src/components/Organization/OrganizationDetailCell/OrganizationDetailCell.mock'

import OrganizationPage from './OrganizationPage'

export default {
  component: OrganizationPage,
  title: 'Pages/Organization/Page',
} as Meta

export const Default: Story = (props) => {
  mockUpdateOrganization()

  return <OrganizationPage {...props} />
}
