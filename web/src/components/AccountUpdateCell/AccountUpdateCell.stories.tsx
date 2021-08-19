import type { Meta } from '@storybook/react'

// @ts-expect-error default is generated before runtime
import AccountUpdateCell from './AccountUpdateCell'
import { Empty, Failure, Loading, Success } from './AccountUpdateCell'
import {
  mockAccount,
  mockAccountError,
  standard,
} from './AccountUpdateCell.mock'

export default {
  component: AccountUpdateCell,
  subcomponents: { Empty, Failure, Loading, Success },
  title: 'Cells/Account/Update',
} as Meta

export const empty = () => <Empty />

export const failure = () => <Failure error={new Error('account-read')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />

export const mockedSuccess = () => {
  mockAccount()

  return <AccountUpdateCell />
}

export const mockedFailure = () => {
  mockAccountError()

  return <AccountUpdateCell />
}
