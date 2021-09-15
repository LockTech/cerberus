import type { Meta, Story } from '@storybook/react'

import RoleUpdateCard from './RoleUpdateCard'
import type { RoleUpdateCardProps } from './RoleUpdateCard'
import {
  mockRoleUpdate,
  mockRoleUpdateError,
  standard,
} from './RoleUpdateCard.mock'

export default {
  component: RoleUpdateCard,
  title: 'Components/Role/UpdateCard',
} as Meta

export const Success: Story<RoleUpdateCardProps> = (args) => {
  mockRoleUpdate()

  return <RoleUpdateCard {...standard} {...args} />
}

export const Error: Story<RoleUpdateCardProps> = (args) => {
  mockRoleUpdateError()

  return <RoleUpdateCard {...standard} {...args} />
}
