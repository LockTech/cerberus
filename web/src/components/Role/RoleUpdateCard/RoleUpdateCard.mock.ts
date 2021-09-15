export const standard = {
  role: {
    id: '1',
    color: '#f3a934',
    name: 'Admin',
  },
}

export const mockRoleUpdate = () => {
  mockCurrentUser({})

  mockGraphQLMutation('RoleUpdateMutation', (_v, { ctx }) => {
    ctx.delay(1500)
    return standard
  })
}

export const mockRoleUpdateError = () => {
  mockCurrentUser({})

  mockGraphQLMutation('RoleUpdateMutation', (_v, { ctx }) => {
    ctx.delay(1500)
    ctx.errors([{ message: 'role-update' }])
    return standard
  })
}
