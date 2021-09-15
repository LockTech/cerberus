import type { Meta, Story } from '@storybook/react'

import RoleBadge from './RoleBadge'
import type { RoleBageProps } from './RoleBadge'

export default {
  component: RoleBadge,
  title: 'Components/Role/Badge',
} as Meta

export const Default: Story<RoleBageProps> = (props) => <RoleBadge {...props} />
Default.args = {
  color: '#2f9299',
  name: 'Admin',
}
