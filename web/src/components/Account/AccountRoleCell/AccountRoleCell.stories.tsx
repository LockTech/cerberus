import type { Meta } from '@storybook/react'

// @ts-expect-error types
import AccountRoleCell from './AccountRoleCell'
import { Failure, Loading, Success } from './AccountRoleCell'
import {
  mockAccountRole,
  mockAccountRoleError,
  standard,
} from './AccountRoleCell.mock'

export default {
  component: AccountRoleCell,
  subcomponents: { Failure, Loading, Success },
  title: 'Cells/Account/Role',
} as Meta

export const failure = () => <Failure error={new Error('An error occured!')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />

export const MockedSuccess = () => {
  mockAccountRole()

  return <AccountRoleCell id="1" />
}

export const MockedError = () => {
  mockAccountRoleError()

  return <AccountRoleCell id="1" />
}
