import type { Meta, Story } from '@storybook/react'

import { mockAccountList } from 'src/components/AccountListCell/AccountListCell.mock'

import AccountListPage from './AccountListPage'

export default {
  component: AccountListPage,
  title: 'Pages/Account/List',
} as Meta

export const Default: Story = (props) => {
  mockAccountList()

  return <AccountListPage {...props} />
}
