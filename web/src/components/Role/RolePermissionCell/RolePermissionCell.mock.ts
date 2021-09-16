import {
  mockRoleAddPermission,
  mockRoleDelPermission,
} from 'src/components/Permission/Permission/Permission.mock'

export const standard = {
  applicationPermissions: [
    {
      application: 'cerberus',
      permissions: [
        {
          id: 'ac83b67d-d592-47cb-934e-28e5a7a50aaf',
          application: 'cerberus',
          namespace: 'cerberus_admins',
          object: '',
          relation: 'is',
        },
      ],
    },
  ],
  role: {
    id: 'ac83b67d-d592-47cb-934e-28e5a7a50aaf',
    name: 'Administrator',
    color: '#a82d96',
    permissions: [{ id: 'ac83b67d-d592-47cb-934e-28e5a7a50aaf' }],
  },
}

export const mockPermissionRole = () => {
  mockCurrentUser({})

  mockGraphQLQuery('RolePermissionQuery', (_v, { ctx }) => {
    ctx.delay(1500)
    return standard
  })

  mockRoleAddPermission()

  mockRoleDelPermission()
}

export const mockPermissionRoleError = () => {
  mockCurrentUser({})

  mockGraphQLQuery('RolePermissionQuery', (_v, { ctx }) => {
    ctx.delay(1500)
    ctx.errors([{ message: 'role-read' }])
    return standard
  })
}
