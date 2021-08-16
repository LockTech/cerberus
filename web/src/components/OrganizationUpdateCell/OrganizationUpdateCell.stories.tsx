import type { Meta } from '@storybook/react'

import { Empty, Failure, Loading, Success } from './OrganizationUpdateCell'
import { standard } from './OrganizationUpdateCell.mock'

export default {
  subcomponents: { Empty, Failure, Loading, Success },
  title: 'Cells/OrganizationUpdateCell',
} as Meta

export const empty = () => <Empty />

export const failure = () => <Failure error={new Error('organization-get')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />
