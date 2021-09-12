import type { Meta } from '@storybook/react'

// @ts-expect-error types
import OrganizationDetailCell from './OrganizationDetailCell'
import { Failure, Loading, Success } from './OrganizationDetailCell'
import {
  mockUpdateOrganization,
  mockUpdateOrganizationError,
  standard,
} from './OrganizationDetailCell.mock'

export default {
  subcomponents: { Failure, Loading, Success },
  title: 'Cells/Organization/Update',
} as Meta

export const failure = () => <Failure error={new Error('organization-read')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />

export const mockedSuccess = () => {
  mockUpdateOrganization()

  return <OrganizationDetailCell />
}

export const mockedFailure = () => {
  mockUpdateOrganizationError()

  return <OrganizationDetailCell />
}
