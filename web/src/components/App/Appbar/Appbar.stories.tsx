import type { Meta, Story } from '@storybook/react'

import Appbar from './Appbar'

export default {
  component: Appbar,
  title: 'Components/App/Bar',
} as Meta

export const Default: Story = ({ name, organizationName }) => {
  mockCurrentUser({
    name,
    organization: {
      name: organizationName,
    },
  })

  return <Appbar />
}
Default.args = {
  name: 'John Doe',
  organizationName: 'Acme Corp',
}
