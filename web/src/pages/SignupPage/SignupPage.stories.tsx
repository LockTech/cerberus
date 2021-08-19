import type { Meta, Story } from '@storybook/react'

import SignupPage from './SignupPage'

export default {
  component: SignupPage,
  title: 'Pages/Signup',
} as Meta

export const Default: Story = (props) => {
  return <SignupPage {...props} />
}
