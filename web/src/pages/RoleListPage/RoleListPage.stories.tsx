import type { Meta, Story } from '@storybook/react'

import RoleListPage from './RoleListPage'

export default {
  component: RoleListPage,
  title: 'Pages/Role/List',
} as Meta

export const Default: Story = (props) => {
  return <RoleListPage {...props} />
}
