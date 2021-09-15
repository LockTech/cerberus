export const standard = {
  account: {
    id: 'c7288601-dd86-444c-9a1c-6c586ffa24e4',
    name: 'Joeseph Doe',
    roles: [
      { color: '#7039a3', id: '1', name: 'Admin' },
      { color: '#33a199', id: '2', name: 'Mod' },
      { color: '#619c30', id: '3', name: 'Helper' },
    ],
  },
  roles: [{ color: '#9e5946', id: '4', name: 'Viewer' }],
}

export const roleStandard = {
  role: {
    id: '1',
  },
}

export const mockAccountRole = () => {
  mockCurrentUser({ id: '1' })

  mockGraphQLQuery('AccountRoleQuery', (_v, { ctx }) => {
    ctx.delay(2000)
    return { ...standard }
  })

  mockGraphQLMutation('AccountAddRoleMutation', (_v, { ctx }) => {
    ctx.delay(2000)
    return { ...roleStandard }
  })

  mockGraphQLMutation('AccountDelRoleMutation', (_v, { ctx }) => {
    ctx.delay(2000)
    return { ...roleStandard }
  })
}

export const mockAccountRoleError = () => {
  mockCurrentUser({ id: '1' })

  mockGraphQLQuery('AccountRoleQuery', (_v, { ctx }) => {
    ctx.delay(2000)
    ctx.errors([{ message: 'roles-read' }])
    return { ...standard }
  })
}
