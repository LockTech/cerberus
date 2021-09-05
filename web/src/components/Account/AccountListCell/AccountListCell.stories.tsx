import type { Meta } from '@storybook/react'

// @ts-expect-error types
import AccountList from './AccountListCell'
import { Failure, Loading, Success } from './AccountListCell'
import { mockAccountList, standard } from './AccountListCell.mock'

export default {
  component: AccountList,
  subcomponents: { Failure, Loading, Success },
  title: 'Cells/Account/List',
} as Meta

export const failure = () => <Failure error={new Error('An error occured!')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />

export const Mocked = () => {
  mockAccountList()

  return <AccountList />
}
