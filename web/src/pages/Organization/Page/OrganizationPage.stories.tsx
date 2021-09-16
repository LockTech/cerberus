import type { Meta, Story } from '@storybook/react'

import { mockOrganizationDetail } from 'src/components/Organization/OrganizationDetailCell/OrganizationDetailCell.mock'

import OrganizationPage from './OrganizationPage'

export default {
  component: OrganizationPage,
  title: 'Pages/Organization/Page',
} as Meta

export const Default: Story = (props) => {
  mockOrganizationDetail()

  return <OrganizationPage {...props} />
}
