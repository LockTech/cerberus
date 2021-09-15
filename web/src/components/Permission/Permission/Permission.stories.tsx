import type { Meta, Story } from '@storybook/react'

import Permission from './Permission'
import type { PermissionProps } from './Permission'

export default {
  component: Permission,
  title: 'Components/Permission/Permission',
} as Meta

export const Default: Story<PermissionProps> = (props) => (
  <Permission {...props} />
)
Default.args = {
  permission: {
    id: '1',
    application: 'cerberus',
    namespace: 'cerberus_admins',
    object: '',
    relation: 'is',
  },
  role: {
    id: '1',
    color: '',
    name: 'Admin',
    permissions: [],
  },
}
