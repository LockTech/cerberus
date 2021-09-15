import type { Meta, Story } from '@storybook/react'

import ApplicationPermissions from './ApplicationPermissions'
import type { ApplicationPermissionsProps } from './ApplicationPermissions'

export default {
  component: ApplicationPermissions,
  title: 'Components/Permission/ApplicationPermissions',
} as Meta

export const Default: Story<ApplicationPermissionsProps> = (props) => (
  <ApplicationPermissions {...props} />
)
Default.args = {
  application: 'cerberus',
  permissions: [
    {
      id: '1',
      application: 'cerberus',
      namespace: 'cerberus_admins',
      object: '',
      relation: 'is',
    },
    {
      id: '2',
      application: 'cerberus',
      namespace: 'cerberus_admins',
      object: '',
      relation: 'storybook',
    },
  ],
}
