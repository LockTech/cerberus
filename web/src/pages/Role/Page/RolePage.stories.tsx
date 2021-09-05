import type { Meta, Story } from '@storybook/react'

import RolePage from './RolePage'
import type { RolePageProps } from './RolePage'

export default {
  component: RolePage,
  title: 'Pages/Role/Details',
} as Meta

export const Default: Story<RolePageProps> = (props) => {
  return <RolePage {...props} />
}
