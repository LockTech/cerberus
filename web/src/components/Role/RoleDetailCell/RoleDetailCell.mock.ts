import {
  mockRoleUpdate,
  mockRoleUpdateError,
} from 'src/components/Role/RoleUpdateCard/RoleUpdateCard.mock'

export const standard = {
  role: {
    id: 'ac83b67d-d592-47cb-934e-28e5a7a50aaf',
    name: 'Administrator',
    color: '#a82d96',
  },
}

export const mockRoleDetail = () => {
  mockCurrentUser({})

  mockGraphQLQuery('RoleDetailQuery', (_v, { ctx }) => {
    ctx.delay(1500)
    return standard
  })

  mockRoleUpdate()
}

export const mockRoleDetailError = () => {
  mockCurrentUser({})

  mockGraphQLQuery('RoleDetailQuery', (_v, { ctx }) => {
    ctx.delay(1500)
    ctx.errors([{ message: 'role-read' }])
    return standard
  })

  mockRoleUpdateError()
}
