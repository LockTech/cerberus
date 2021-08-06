import type { Meta } from '@storybook/react'

import { Empty, Failure, Loading, Success } from './AccountUpdateCell'
import { standard } from './AccountUpdateCell.mock'

export default {
  subcomponents: { Empty, Failure, Loading, Success },
  title: 'Cells/AccountUpdateCell',
} as Meta

export const empty = () => <Empty />

export const failure = () => <Failure error={new Error('account-get')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />
