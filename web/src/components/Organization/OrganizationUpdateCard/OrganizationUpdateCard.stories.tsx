import type { Meta } from '@storybook/react'

import OrganizationUpdateCard from './OrganizationUpdateCard'
import {
  mockOrganizationUpdate,
  mockOrganizationUpdateError,
  standard,
} from './OrganizationUpdateCard.mock'

export default {
  component: OrganizationUpdateCard,
  title: 'Components/Organization/UpdateCard',
} as Meta

export const Success = () => {
  mockOrganizationUpdate()

  return <OrganizationUpdateCard {...standard} />
}

export const Failure = () => {
  mockOrganizationUpdateError()

  return <OrganizationUpdateCard {...standard} />
}
