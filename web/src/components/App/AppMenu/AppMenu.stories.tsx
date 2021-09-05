import { mockCurrentUser } from '@redwoodjs/testing/web'
import type { Meta, Story } from '@storybook/react'

import AppMenu from './AppMenu'

export default {
  component: AppMenu,
  title: 'Components/App/Menu',
} as Meta

export const Default: Story = ({ name, organizationName }) => {
  mockCurrentUser({
    name,
    organization: {
      name: organizationName,
    },
  })

  return (
    <div className="flex flex-row justify-end">
      <AppMenu />
    </div>
  )
}
Default.args = {
  name: 'John Doe',
  organizationName: 'Acme Corp',
}
