import type { Meta, Story } from '@storybook/react'

import { mockAccount } from 'src/components/Account/AccountDetailCell/AccountDetailCell.mock'

import AccountPage from './AccountPage'
import type { AccountPageProps } from './AccountPage'

export default {
  component: AccountPage,
  title: 'Pages/Account/Details',
} as Meta

export const Default: Story<AccountPageProps> = (props) => {
  mockAccount()

  return <AccountPage {...props} />
}
