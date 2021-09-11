import type { Meta } from '@storybook/react'

// @ts-expect-error types
import RoleDetailCell from './RoleDetailCell'
import { Failure, Loading, Success } from './RoleDetailCell'
import { mockRoleUpdate, standard } from './RoleUpdateCell.mock'

export default {
  component: RoleDetailCell,
  subcomponents: { Failure, Loading, Success },
  title: 'Cells/Role/Update',
} as Meta

export const failure = () => <Failure error={new Error('An error occured!')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />

export const Mocked = () => {
  mockRoleUpdate()

  return <RoleDetailCell />
}
