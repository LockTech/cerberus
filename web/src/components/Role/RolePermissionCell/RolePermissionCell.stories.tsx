import type { Meta } from '@storybook/react'

// @ts-expect-error types
import RolePermissionCell from './RolePermissionCell'
import { Failure, Loading, Success } from './RolePermissionCell'
import {
  mockPermissionRole,
  mockPermissionRoleError,
  standard,
} from './RolePermissionCell.mock'

export default {
  component: RolePermissionCell,
  subcomponents: { Failure, Loading, Success },
  title: 'Cells/Role/Permission',
} as Meta

export const failure = () => <Failure error={new Error('An error occured!')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />

export const MockedSuccess = () => {
  mockPermissionRole()

  return <RolePermissionCell />
}

export const MockedError = () => {
  mockPermissionRoleError()

  return <RolePermissionCell />
}
