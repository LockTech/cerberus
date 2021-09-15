import type { Meta, Story } from '@storybook/react'

import AccountDeleteModal from './AccountDeleteModal'
import type { AccountDeleteModalProps } from './AccountDeleteModal'
import {
  mockAccountDelete,
  mockAccountDeleteError,
} from './AccountDeleteModal.mock'

export default {
  component: AccountDeleteModal,
  title: 'Components/Account/DeleteModal',
} as Meta

export const Success: Story<AccountDeleteModalProps> = (args) => {
  mockAccountDelete()

  return <AccountDeleteModal {...args} />
}

export const Error: Story<AccountDeleteModalProps> = (args) => {
  mockAccountDeleteError()

  return <AccountDeleteModal {...args} />
}
