import type { Meta, Story } from '@storybook/react'

import SignupLoginPage from './SignupLoginPage'
import type { SignupLoginPageProps } from './SignupLoginPage'

export default {
  component: SignupLoginPage,
  title: 'Pages/Auth/Signup/Login',
} as Meta

export const Default: Story<SignupLoginPageProps> = (args) => {
  return <SignupLoginPage {...args} />
}
