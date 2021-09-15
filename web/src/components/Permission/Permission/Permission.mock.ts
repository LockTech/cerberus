export const standard = {
  role: {
    id: '8131ece9-0d52-4c7b-bb62-fb3e77cb59fc',
    name: 'Administrator',
  },
}

export const mockRoleAddPermission = () => {
  mockCurrentUser({})

  mockGraphQLMutation('RoleCreateMutation', (_v, { ctx }) => {
    ctx.delay(1500)
    return standard
  })
}

export const mockRoleAddPermissionError = () => {
  mockCurrentUser({})

  mockGraphQLMutation('RoleCreateMutation', (_v, { ctx }) => {
    ctx.delay(1500)
    ctx.errors([{ message: 'role-create' }])
    return standard
  })
}

export const mockRoleDelPermission = () => {
  mockCurrentUser({})

  mockGraphQLMutation('RoleCreateMutation', (_v, { ctx }) => {
    ctx.delay(1500)
    return standard
  })
}

export const mockRoleDelPermissionError = () => {
  mockCurrentUser({})

  mockGraphQLMutation('RoleCreateMutation', (_v, { ctx }) => {
    ctx.delay(1500)
    ctx.errors([{ message: 'role-create' }])
    return standard
  })
}
