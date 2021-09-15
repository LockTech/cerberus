import type { Meta } from '@storybook/react'

import { mockAccountUpdate } from 'src/components/Account/AccountUpdateCard/AccountUpdateCard.mock'

// @ts-expect-error default is generated before runtime
import AccountDetailCell from './AccountDetailCell'
import { Failure, Loading, Success } from './AccountDetailCell'
import {
  mockAccountDetail,
  mockAccountDetailError,
  standard,
} from './AccountDetailCell.mock'

export default {
  component: AccountDetailCell,
  subcomponents: { Failure, Loading, Success },
  title: 'Cells/Account/Detail',
} as Meta

export const failure = () => <Failure error={new Error('account-read')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />

export const mockedSuccess = () => {
  mockAccountDetail()
  mockAccountUpdate()

  return <AccountDetailCell />
}

export const mockedFailure = () => {
  mockAccountDetailError()
  mockAccountUpdate()

  return <AccountDetailCell />
}
