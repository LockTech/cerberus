import type { Meta, Story } from '@storybook/react'

import { standard } from 'src/components/Role/RoleDetailCell/RoleDetailCell.mock'
import { mockRoleCreate } from 'src/components/Role/RoleDeleteModal/RoleDeleteModal.mock'

import RoleDangerCard from './RoleDangerCard'
import type { RoleDangerCardProps } from './RoleDangerCard'

export default {
  component: RoleDangerCard,
  title: 'Components/Role/DangerCard',
} as Meta

export const Default: Story<RoleDangerCardProps> = (props) => {
  mockRoleCreate()

  return <RoleDangerCard {...standard} {...props} />
}
