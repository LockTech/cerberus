import type { Meta } from '@storybook/react'

// @ts-expect-error types
import OrganizationDetailCell from './OrganizationDetailCell'
import { Failure, Loading, Success } from './OrganizationDetailCell'
import {
  mockOrganizationDetail,
  mockOrganizationDetailError,
  standard,
} from './OrganizationDetailCell.mock'

export default {
  component: OrganizationDetailCell,
  subcomponents: { Failure, Loading, Success },
  title: 'Cells/Organization/Detail',
} as Meta

export const failure = () => <Failure error={new Error('organization-read')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />

export const mockedSuccess = () => {
  mockOrganizationDetail()

  return <OrganizationDetailCell />
}

export const mockedFailure = () => {
  mockOrganizationDetailError()

  return <OrganizationDetailCell />
}
