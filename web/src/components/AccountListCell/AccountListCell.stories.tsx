import type { Meta } from '@storybook/react'

import { Empty, Failure, Loading, Success } from './AccountListCell'
import { standard } from './AccountListCell.mock'

export default {
  subcomponents: { Empty, Failure, Loading, Success },
  title: 'Cells/AccountListCell',
} as Meta

export const failure = () => <Failure error={new Error('Oh no!')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />
