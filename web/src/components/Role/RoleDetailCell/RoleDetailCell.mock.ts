export const standard = {
  role: {
    id: 'ac83b67d-d592-47cb-934e-28e5a7a50aaf',
    name: 'Administrator',
    createdAt: '2021-08-06T01:28:30+0000',
  },
}

export const mockRoleUpdate = () => {
  mockGraphQLQuery('RoleDetailQuery', (_v, { ctx }) => {
    ctx.delay(1500)
    return standard
  })
}
