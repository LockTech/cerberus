import type { Meta } from '@storybook/react'

// @ts-expect-error default is generated before runtime
import AccountDetailCell from './AccountDetailCell'
import { Failure, Loading, Success } from './AccountDetailCell'
import {
  mockAccount,
  mockAccountError,
  standard,
} from './AccountDetailCell.mock'

export default {
  component: AccountDetailCell,
  subcomponents: { Failure, Loading, Success },
  title: 'Cells/Account/Update',
} as Meta

export const failure = () => <Failure error={new Error('account-read')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />

export const mockedSuccess = () => {
  mockAccount()

  return <AccountDetailCell />
}

export const mockedFailure = () => {
  mockAccountError()

  return <AccountDetailCell />
}
