import type { Meta, Story } from '@storybook/react'

import SignupOrganizationPage from './SignupOrganizationPage'

export default {
  component: SignupOrganizationPage,
  title: 'Pages/Signup/Organization',
} as Meta

export const Default: Story = (props) => {
  return <SignupOrganizationPage {...props} />
}
