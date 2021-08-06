import type { Meta } from '@storybook/react'

import { Failure, Loading, Success } from './AccountListCell'
import { standard } from './AccountListCell.mock'

export default {
  subcomponents: { Failure, Loading, Success },
  title: 'Cells/AccountListCell',
} as Meta

export const databaseFailure = () => (
  <Failure error={new Error('account-get')} />
)

export const loading = () => <Loading />

export const success = () => <Success {...standard} />
