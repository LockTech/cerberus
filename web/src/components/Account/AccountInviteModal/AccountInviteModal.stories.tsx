import type { Meta, Story } from '@storybook/react'

import AccountInviteModal from './AccountInviteModal'
import { standard } from './AccountInviteModal.mock'

export default {
  component: AccountInviteModal,
  title: 'Components/Account/InviteModal',
} as Meta

export const Success: Story = (props) => {
  mockGraphQLMutation('InviteMemberMutation', (_variables, { ctx }) => {
    ctx.delay(1500)
    return standard
  })

  return <AccountInviteModal {...props} />
}

export const Failure: Story = (props) => {
  mockGraphQLMutation('InviteMemberMutation', (_variables, { ctx }) => {
    ctx.delay(1500)
    ctx.errors([{ message: 'An unexpected error occured.' }])
    return standard
  })

  return <AccountInviteModal {...props} />
}
