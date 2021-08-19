export const standard = {
  roles: [
    {
      id: 'ac83b67d-d592-47cb-934e-28e5a7a50aaf',
      name: 'Administrator',
      createdAt: '2021-08-06T01:28:30+0000',
    },
    {
      id: '984f13a0-9db5-4fa1-8e86-271561b1b70b',
      name: 'Sales',
      createdAt: '2021-08-06T01:28:30+0000',
    },
    {
      id: '984f13a0-9db5-4fa1-8e86-271561b1b70b',
      name: 'Warehouse',
      createdAt: '2021-08-06T01:28:30+0000',
    },
    {
      id: '984f13a0-9db5-4fa1-8e86-271561b1b70b',
      name: 'Operations',
      createdAt: '2021-08-06T01:28:30+0000',
    },
  ],
}

export const mockRoleList = () => {
  mockGraphQLQuery('RoleListQuery', (_v, { ctx }) => {
    ctx.delay(1500)
    return standard
  })
}
