import { validate as validateUUID } from 'uuid'
import type { Organization, Role } from '@prisma/client'

import { db } from 'src/lib/db'

import {
  createRole,
  deleteRole,
  role as getRole,
  roles,
  updateRole,
} from './roles'
import type { RoleStandard } from './roles.scenarios'

const Create = {
  name: 'UserInputError',
  message: 'role-create',
}

describe('role service', () => {
  describe('create', () => {
    scenario(
      'throws when it encounters a prisma error',
      async (scenarios: RoleStandard) => {
        const org = scenarios.organization.one as Organization
        const organizationId = org.id

        mockCurrentUser({ organizationId })

        const role = scenarios.role.one as Role
        const name = role.name

        expect(createRole({ name })).rejects.toThrow(Create)
      }
    )

    scenario(
      'creates a new role using the given `name`',
      async (scenarios: RoleStandard) => {
        const org = scenarios.organization.one as Organization
        const organizationId = org.id

        mockCurrentUser({ organizationId })

        const name = 'Moderator'

        const res = await createRole({ name })

        expect(res.name).toBe(name)
      }
    )

    scenario(
      'creates a new role assigning it a UUID',
      async (scenarios: RoleStandard) => {
        const org = scenarios.organization.one as Organization
        const organizationId = org.id

        mockCurrentUser({ organizationId })

        const name = 'Moderator'

        const res = await createRole({ name })

        expect(res.id).toBeDefined()
        expect(validateUUID(res.id)).toBeTruthy()
      }
    )
  })

  describe('read', () => {
    describe('role', () => {
      scenario(
        'returns `null` if the role cannot be found',
        async (scenario: RoleStandard) => {
          const org = scenario.organization.one as Organization
          const organizationId = org.id

          mockCurrentUser({ organizationId })

          const res = await getRole({ id: '1' })

          expect(res).toBeNull()
        }
      )

      scenario(
        'returns the role backing the query',
        async (scenario: RoleStandard) => {
          const org = scenario.organization.one as Organization
          const organizationId = org.id

          mockCurrentUser({ organizationId })

          const role = scenario.role.one as Role
          const id = role.id

          const res = await getRole({ id })

          expect(res).toEqual(expect.objectContaining<Role>(role))
        }
      )

      scenario(
        'returns `null` when the given id belongs to another organization',
        async (scenario: RoleStandard) => {
          const org = scenario.organization.two as Organization
          const organizationId = org.id

          mockCurrentUser({ organizationId })

          const role = scenario.role.one as Role
          const id = role.id

          const res = await getRole({ id })

          expect(res).toBeNull()
        }
      )
    })

    describe('roles', () => {
      scenario(
        'returns an empty array when no roles can be found',
        async (_scenario: RoleStandard) => {
          mockCurrentUser({ organizationId: '1' })

          const res = await roles()

          expect(res).toEqual(expect.arrayContaining([]))
        }
      )

      scenario(
        "returns a list of the invoking organization's roles",
        async (scenario: RoleStandard) => {
          const org = scenario.organization.one as Organization
          const organizationId = org.id
          mockCurrentUser({ organizationId })

          const role1 = scenario.role.one as Role
          const role2 = scenario.role.two as Role
          const role3 = scenario.role.three as Role

          const res = await roles()

          expect(res).toEqual(expect.arrayContaining([role1, role2]))
          expect(res).not.toEqual(expect.arrayContaining([role3]))
        }
      )
    })
  })

  describe('update', () => {
    scenario(
      'updates the role using the given `id` and `name`',
      async (scenario: RoleStandard) => {
        const org = scenario.organization.one as Organization
        const organizationId = org.id

        mockCurrentUser({ organizationId })

        const role = scenario.role.one as Role
        const id = role.id
        const name = 'Gardener'

        const res = await updateRole({ id, name })

        expect(res.name).toBe(name)
        expect(res).not.toEqual(expect.objectContaining<Role>(role))
      }
    )

    scenario(
      "does not change the organization's `id`",
      async (scenario: RoleStandard) => {
        const org = scenario.organization.one as Organization
        const organizationId = org.id

        mockCurrentUser({ organizationId })

        const role = scenario.role.one as Role
        const id = role.id
        const name = 'Gardener'

        const res = await updateRole({ id, name })

        expect(res.id).toBe(id)
      }
    )
  })

  describe('delete', () => {
    scenario(
      'removes the given role from the database',
      async (scenario: RoleStandard) => {
        const org = scenario.organization.one as Organization
        const organizationId = org.id

        mockCurrentUser({ organizationId })

        const role = scenario.role.one as Role
        const id = role.id

        const res = await deleteRole({ id })

        const dbRes = await db.role.findUnique({ where: { id } })

        expect(res).toEqual(expect.objectContaining<Role>(role))
        expect(dbRes).toBeNull()
      }
    )
  })
})
