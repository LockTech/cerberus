export const standard = {
  roles: [
    {
      id: 'ac83b67d-d592-47cb-934e-28e5a7a50aaf',
      name: 'Administrator',
      createdAt: '2021-08-06T01:28:30+0000',
      color: '#7039a3',
    },
    {
      id: '984f13a0-9db5-4fa1-8e86-271561b1b70b',
      name: 'Sales',
      createdAt: '2021-08-06T01:28:30+0000',
      color: '#33a199',
    },
    {
      id: '984f13a0-9db5-4fa1-8e86-271561b1b70b',
      name: 'Warehouse',
      createdAt: '2021-08-06T01:28:30+0000',
      color: '#619c30',
    },
    {
      id: '984f13a0-9db5-4fa1-8e86-271561b1b70b',
      name: 'Operations',
      createdAt: '2021-08-06T01:28:30+0000',
      color: '#9e5946',
    },
  ],
}

export const mockRoleList = () => {
  mockGraphQLQuery('RoleListQuery', (_v, { ctx }) => {
    ctx.delay(1500)
    return standard
  })
}

export const mockRoleListError = () => {
  mockGraphQLQuery('RoleListQuery', (_v, { ctx }) => {
    ctx.delay(1500)
    ctx.errors([{ message: 'roles-read' }])
    return standard
  })
}
