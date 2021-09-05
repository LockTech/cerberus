import type { Meta } from '@storybook/react'

// @ts-expect-error types
import RoleListCell from './RoleListCell'
import { Failure, Loading, Success } from './RoleListCell'
import { mockRoleList, standard } from './RoleListCell.mock'

export default {
  component: RoleListCell,
  subcomponents: { Failure, Loading, Success },
  title: 'Cells/Role/List',
} as Meta

export const failure = () => <Failure error={new Error('An error occured!')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />

export const Mocked = () => {
  mockRoleList()

  return <RoleListCell />
}
