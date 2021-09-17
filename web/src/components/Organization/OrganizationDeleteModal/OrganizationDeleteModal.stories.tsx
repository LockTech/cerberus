import type { Meta, Story } from '@storybook/react'

import OrganizationDeleteModal from './OrganizationDeleteModal'
import {
  mockOrganizationDelete,
  mockOrganizationDeleteError,
} from './OrganizationDeleteModal.mock'

export default {
  component: OrganizationDeleteModal,
  title: 'Components/Account/DeleteModal',
} as Meta

export const Success: Story = (args) => {
  mockOrganizationDelete()

  return <OrganizationDeleteModal {...args} />
}

export const Error: Story = (args) => {
  mockOrganizationDeleteError()

  return <OrganizationDeleteModal {...args} />
}
