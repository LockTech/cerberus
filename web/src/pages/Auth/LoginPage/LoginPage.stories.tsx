import type { Meta, Story } from '@storybook/react'

import LoginPage from './LoginPage'

export default {
  component: LoginPage,
  title: 'Pages/Auth/Login',
} as Meta

export const Default: Story = (props) => {
  return <LoginPage {...props} />
}
