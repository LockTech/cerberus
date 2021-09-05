import type { Meta } from '@storybook/react'

// @ts-expect-error types
import RoleUpdateCell from './RoleUpdateCell'
import { Failure, Loading, Success } from './RoleUpdateCell'
import { mockRoleUpdate, standard } from './RoleUpdateCell.mock'

export default {
  component: RoleUpdateCell,
  subcomponents: { Failure, Loading, Success },
  title: 'Cells/Role/Update',
} as Meta

export const failure = () => <Failure error={new Error('An error occured!')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />

export const Mocked = () => {
  mockRoleUpdate()

  return <RoleUpdateCell />
}
