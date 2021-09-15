import type { Meta, Story } from '@storybook/react'

import RoleCreateModal from './RoleCreateModal'
import { mockRoleCreate, mockRoleCreateError } from './RoleCreateModal.mock'

export default {
  component: RoleCreateModal,
  title: 'Components/Role/CreateModal',
} as Meta

export const Success: Story = (props) => {
  mockRoleCreate()

  return <RoleCreateModal {...props} />
}

export const Error: Story = (props) => {
  mockRoleCreateError()

  return <RoleCreateModal {...props} />
}
