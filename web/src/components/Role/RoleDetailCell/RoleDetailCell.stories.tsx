import type { Meta } from '@storybook/react'

// @ts-expect-error types
import RoleDetailCell from './RoleDetailCell'
import { Failure, Loading, Success } from './RoleDetailCell'
import {
  mockRoleDetail,
  mockRoleDetailError,
  standard,
} from './RoleDetailCell.mock'

export default {
  component: RoleDetailCell,
  subcomponents: { Failure, Loading, Success },
  title: 'Cells/Role/Detail',
} as Meta

export const failure = () => <Failure error={new Error('An error occured!')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />

export const MockedSuccess = () => {
  mockRoleDetail()

  return <RoleDetailCell />
}

export const MockedError = () => {
  mockRoleDetailError()

  return <RoleDetailCell />
}
