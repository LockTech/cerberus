import {
  mockOrganizationUpdate,
  mockOrganizationUpdateError,
} from 'src/components/Organization/OrganizationUpdateCard/OrganizationUpdateCard.mock'

export const standard = {
  organization: {
    id: '8131ece9-0d52-4c7b-bb62-fb3e77cb59fc',
    name: 'Example Inc.',
  },
}

export const mockOrganizationDetail = () => {
  mockCurrentUser({})

  mockGraphQLQuery('OrganizationDetailQuery', (_v, { ctx }) => {
    ctx.delay(1500)
    return standard
  })

  mockOrganizationUpdate()
}

export const mockOrganizationDetailError = () => {
  mockCurrentUser({})

  mockGraphQLQuery('OrganizationDetailQuery', (_v, { ctx }) => {
    ctx.delay(1500)
    ctx.errors([{ message: 'organization-read' }])
    return standard
  })

  mockOrganizationUpdateError()
}
