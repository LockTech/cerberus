export const standard = {
  organization: {
    id: '1',
  },
}

export const mockOrganizationDelete = () => {
  mockCurrentUser({ id: '1' })

  mockGraphQLMutation('OrganizationDeleteMutation', (_v, { ctx }) => {
    ctx.delay(2000)
    return { ...standard }
  })
}

export const mockOrganizationDeleteError = () => {
  mockCurrentUser({ id: '1' })

  mockGraphQLMutation('OrganizationDeleteMutation', (_v, { ctx }) => {
    ctx.delay(2000)
    ctx.errors([{ message: 'organization-delete' }])
    return { ...standard }
  })
}
