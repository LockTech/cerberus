import type { Meta, Story } from '@storybook/react'

import SignupConfirmationPage from './SignupConfirmationPage'

export default {
  component: SignupConfirmationPage,
  title: 'Pages/Signup/Confirmation',
} as Meta

export const Default: Story = (props) => {
  return <SignupConfirmationPage {...props} />
}
