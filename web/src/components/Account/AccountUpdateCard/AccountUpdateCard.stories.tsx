import type { Meta, Story } from '@storybook/react'

import AccountUpdateCard from './AccountUpdateCard'
import type { AccountUpdateCardProps } from './AccountUpdateCard'
import {
  mockAccountUpdate,
  mockAccountUpdateError,
  standard,
} from './AccountUpdateCard.mock'

export default {
  component: AccountUpdateCard,
  title: 'Components/Account/UpdateCard',
} as Meta

export const Success: Story<AccountUpdateCardProps> = (args) => {
  mockAccountUpdate()

  return <AccountUpdateCard {...standard} {...args} />
}

export const Error: Story<AccountUpdateCardProps> = (args) => {
  mockAccountUpdateError()

  return <AccountUpdateCard {...standard} {...args} />
}
