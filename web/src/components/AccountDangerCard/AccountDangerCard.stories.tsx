import type { Meta, Story } from '@storybook/react'

import AccountDangerCard from './AccountDangerCard'
import type { AccountDangerCardProps } from './AccountDangerCard'

export default {
  component: AccountDangerCard,
  title: 'Components/Account/DangerCard',
} as Meta

export const Default: Story<AccountDangerCardProps> = (props) => (
  <AccountDangerCard {...props} />
)
Default.args = {
  name: 'John Doe',
}
