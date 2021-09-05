export const standard = {
  organization: {
    id: '8131ece9-0d52-4c7b-bb62-fb3e77cb59fc',
    name: 'Example Inc.',
  },
}

export const mockUpdateOrganization = () => {
  mockCurrentUser({})

  mockGraphQLQuery('OrganizationUpdateQuery', (_v, { ctx }) => {
    ctx.delay(1500)
    return standard
  })

  mockGraphQLMutation('OrganizationUpdateMutation', (_v, { ctx }) => {
    ctx.delay(1500)
    return standard
  })
}

export const mockUpdateOrganizationError = () => {
  mockCurrentUser({})

  mockGraphQLQuery('OrganizationUpdateQuery', (_v, { ctx }) => {
    ctx.delay(1500)
    return standard
  })

  mockGraphQLMutation('OrganizationUpdateMutation', (_v, { ctx }) => {
    ctx.delay(1500)
    ctx.errors([{ message: 'organization-update' }])
    return standard
  })
}
