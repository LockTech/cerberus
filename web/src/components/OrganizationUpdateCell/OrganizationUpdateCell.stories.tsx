import type { Meta } from '@storybook/react'

// @ts-expect-error types
import OrganizationUpdateCell from './OrganizationUpdateCell'
import { Failure, Loading, Success } from './OrganizationUpdateCell'
import {
  mockUpdateOrganization,
  mockUpdateOrganizationError,
  standard,
} from './OrganizationUpdateCell.mock'

export default {
  subcomponents: { Failure, Loading, Success },
  title: 'Cells/Organization/UpdateCell',
} as Meta

export const failure = () => <Failure error={new Error('organization-read')} />

export const loading = () => <Loading />

export const success = () => <Success {...standard} />

export const mockedSuccess = () => {
  mockUpdateOrganization()

  return <OrganizationUpdateCell />
}

export const mockedFailure = () => {
  mockUpdateOrganizationError()

  return <OrganizationUpdateCell />
}
