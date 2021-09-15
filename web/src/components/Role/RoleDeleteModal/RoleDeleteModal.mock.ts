export const standard = {
  role: {
    id: '1',
  },
}

export const mockRoleCreate = () => {
  mockCurrentUser({})

  mockGraphQLMutation('RoleDeleteMutation', (_v, { ctx }) => {
    ctx.delay(1500)
    return standard
  })
}

export const mockRoleCreateError = () => {
  mockCurrentUser({})

  mockGraphQLMutation('RoleDeleteMutation', (_v, { ctx }) => {
    ctx.delay(1500)
    ctx.errors([{ message: 'role-delete' }])
    return standard
  })
}
