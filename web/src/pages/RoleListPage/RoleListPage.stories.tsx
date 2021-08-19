import type { Meta, Story } from '@storybook/react'

import { mockRoleList } from 'src/components/RoleListCell/RoleListCell.mock'

import RoleListPage from './RoleListPage'

export default {
  component: RoleListPage,
  title: 'Pages/Role/List',
} as Meta

export const Default: Story = (props) => {
  mockRoleList()

  return <RoleListPage {...props} />
}
