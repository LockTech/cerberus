import type { Meta, Story } from '@storybook/react'

import SignupConfirmationPage from './SignupConfirmationPage'
import type { SignupConfirmationPageProps } from './SignupConfirmationPage'

export default {
  component: SignupConfirmationPage,
  title: 'Pages/Auth/Signup/Confirmation',
} as Meta

export const Default: Story<SignupConfirmationPageProps> = (args) => {
  return <SignupConfirmationPage {...args} />
}
