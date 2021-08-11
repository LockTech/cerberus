import { validate as validateUUID } from 'uuid'
import type { Account, Organization, Permission, Role } from '@prisma/client'

import { db } from 'src/lib/db'

import { deleteTuple, writeTuple } from 'src/helpers/keto'

import {
  buildPermissionSubjectSet,
  buildAccountRoleTuple,
  //
  createRole,
  role as getRole,
  roles,
  updateRole,
  deleteRole,
  deleteAllRoles,
  //
  addPermToRole,
  addRoleToAccount,
  delPermFromRole,
  delRoleFromAccount,
} from './roles'
import type { RoleStandard } from './roles.scenarios'

jest.mock('../../helpers/keto/keto')

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
        // @ts-expect-error jest typings
        deleteTuple.mockResolvedValue(null)

        const org = scenario.organization.one as Organization
        const organizationId = org.id

        mockCurrentUser({ organizationId })

        const role = scenario.role.one as Role
        const id = role.id

        await deleteRole({ id })

        const dbRes = await db.role.findUnique({ where: { id } })

        expect(dbRes).toBeNull()
      }
    )

    scenario(
      'removes the given role even if it has no assigned accounts',
      async (scenario: RoleStandard) => {
        // @ts-expect-error jest typings
        deleteTuple.mockResolvedValue(null)

        const org = scenario.organization.one as Organization
        const organizationId = org.id

        mockCurrentUser({ organizationId })

        const role = scenario.role.two as Role
        const id = role.id

        await deleteRole({ id })

        const dbRes = await db.role.findUnique({ where: { id } })

        expect(dbRes).toBeNull()
      }
    )

    scenario(
      'removes the given role even if it has no assigned permissions',
      async (scenario: RoleStandard) => {
        // @ts-expect-error jest typings
        deleteTuple.mockResolvedValue(null)

        const org = scenario.organization.one as Organization
        const organizationId = org.id

        mockCurrentUser({ organizationId })

        const role = scenario.role.four as Role
        const id = role.id

        await deleteRole({ id })

        const dbRes = await db.role.findUnique({ where: { id } })

        expect(dbRes).toBeNull()
      }
    )

    scenario(
      'returns the deleted role as the response',
      async (scenario: RoleStandard) => {
        // @ts-expect-error jest typings
        deleteTuple.mockResolvedValue(null)

        const org = scenario.organization.one as Organization
        const organizationId = org.id

        mockCurrentUser({ organizationId })

        const role = scenario.role.one as Role
        const id = role.id

        const res = await deleteRole({ id })

        expect(res).toEqual(expect.objectContaining<Role>(role))
      }
    )

    scenario(
      "attempts to delete each role's relation-tuple",
      async (scenario: RoleStandard) => {
        // @ts-expect-error jest typings
        deleteTuple.mockResolvedValue(null)

        const role = scenario.role.one as Role
        const id = role.id
        const organizationId = role.organizationId

        const permCount = 3
        const accountCount = 1

        const acc = scenario.account.one as Account
        const accId = acc.id
        const accTuple = buildAccountRoleTuple(accId, id)

        const perm = scenario.permission.one as Permission
        const { namespace, object, relation } = perm
        const permTuple = {
          namespace,
          object,
          relation,
          subject: buildPermissionSubjectSet(id),
        }

        mockCurrentUser({ organizationId })

        await deleteRole({ id })

        expect(deleteTuple).toHaveBeenCalledTimes(accountCount + permCount)
        expect(deleteTuple).toHaveBeenNthCalledWith(1, permTuple)
        expect(deleteTuple).toHaveBeenNthCalledWith(4, accTuple)
      }
    )

    describe('deleteAll', () => {
      scenario(
        'deletes all permissions from all roles',
        async (scenario: RoleStandard) => {
          const role = scenario.role.one as Role
          const organizationId = role.organizationId

          mockCurrentUser({ organizationId })

          const perm1 = scenario.permission.one as Permission
          const application = perm1.application
          const perm2 = scenario.permission.two as Permission
          const perm3 = scenario.permission.three as Permission

          await deleteAllRoles()

          const permDbRes = await db.permission.findMany({
            where: {
              application,
            },
          })
          const roleDbRes = await db.role.findMany({
            where: { organizationId },
          })

          expect(permDbRes).toEqual(
            expect.arrayContaining([perm1, perm2, perm3])
          )
          expect(roleDbRes).toEqual(expect.arrayContaining([]))
        }
      )

      scenario(
        'attempts to delete all permission relation-tuples from Keto',
        async (scenario: RoleStandard) => {
          const role = scenario.role.one as Role
          const roleId = role.id
          const organizationId = role.organizationId

          mockCurrentUser({ organizationId })

          const perm = scenario.permission.one as Permission
          const { namespace, object, relation } = perm

          // @ts-expect-error jest typings
          deleteTuple.mockResolvedValue(null)

          await deleteAllRoles()

          const tuple = {
            namespace,
            object,
            relation,
            subject: buildPermissionSubjectSet(roleId),
          }

          expect(deleteTuple).toHaveBeenCalledWith(tuple)
        }
      )

      scenario(
        'deletes all roles from all accounts',
        async (scenario: RoleStandard) => {
          const role = scenario.role.one as Role
          const organizationId = role.organizationId

          mockCurrentUser({ organizationId })

          const acc1 = scenario.account.one as Account
          const acc2 = scenario.account.two as Account

          await deleteAllRoles()

          const accDbRes = await db.account.findMany({
            where: {
              organizationId,
            },
          })
          const roleDbRes = await db.role.findMany({
            where: { organizationId },
          })

          expect(accDbRes).toEqual(expect.arrayContaining([acc1, acc2]))
          expect(roleDbRes).toEqual(expect.arrayContaining([]))
        }
      )

      scenario(
        'attempts to delete all account relation-tuples from Keto',
        async (scenario: RoleStandard) => {
          const role = scenario.role.one as Role
          const roleId = role.id
          const organizationId = role.organizationId

          mockCurrentUser({ organizationId })

          const acc = scenario.account.one as Account
          const accountId = acc.id

          // @ts-expect-error jest typings
          deleteTuple.mockResolvedValue(null)

          await deleteAllRoles()

          expect(deleteTuple).toHaveBeenCalledWith(
            buildAccountRoleTuple(accountId, roleId)
          )
        }
      )

      scenario(
        'attempts to delete all relation-tuples in the expected order',
        async (scenario: RoleStandard) => {
          const role1 = scenario.role.one as Role
          const role1Id = role1.id
          const role2 = scenario.role.two as Role
          const role2Id = role2.id
          const role4 = scenario.role.four as Role
          const role4Id = role4.id

          const acc1 = scenario.account.one as Account
          const acc1Id = acc1.id
          const acc2 = scenario.account.two as Account
          const acc2Id = acc2.id

          const perm1 = scenario.permission.one as Permission
          const tuple1 = {
            namespace: perm1.namespace,
            object: perm1.object,
            relation: perm1.relation,
          }
          const perm2 = scenario.permission.two as Permission
          const tuple2 = {
            namespace: perm2.namespace,
            object: perm2.object,
            relation: perm2.relation,
          }
          const perm3 = scenario.permission.three as Permission
          const tuple3 = {
            namespace: perm3.namespace,
            object: perm3.object,
            relation: perm3.relation,
          }

          const organization = scenario.organization.one as Organization
          const organizationId = organization.id
          mockCurrentUser({ organizationId })

          // @ts-expect-error jest typings
          deleteTuple.mockResolvedValue(null)

          await deleteAllRoles()

          expect(deleteTuple).toHaveBeenNthCalledWith(1, {
            ...tuple1,
            subject: buildPermissionSubjectSet(role1Id),
          })
          expect(deleteTuple).toHaveBeenNthCalledWith(2, {
            ...tuple2,
            subject: buildPermissionSubjectSet(role1Id),
          })
          expect(deleteTuple).toHaveBeenNthCalledWith(3, {
            ...tuple3,
            subject: buildPermissionSubjectSet(role1Id),
          })
          expect(deleteTuple).toHaveBeenNthCalledWith(3, {
            ...tuple3,
            subject: buildPermissionSubjectSet(role1Id),
          })
          expect(deleteTuple).toHaveBeenNthCalledWith(
            4,
            buildAccountRoleTuple(acc1Id, role1Id)
          )
          expect(deleteTuple).toHaveBeenNthCalledWith(5, {
            ...tuple3,
            subject: buildPermissionSubjectSet(role2Id),
          })
          expect(deleteTuple).toHaveBeenNthCalledWith(
            6,
            buildAccountRoleTuple(acc2Id, role4Id)
          )
        }
      )

      scenario(
        'attempts to delete the expected number of relation-tuples',
        async (scenario: RoleStandard) => {
          const role = scenario.role.one as Role
          const organizationId = role.organizationId

          mockCurrentUser({ organizationId })

          // @ts-expect-error jest typings
          deleteTuple.mockResolvedValue(null)

          await deleteAllRoles()

          expect(deleteTuple).toHaveBeenCalledTimes(6)
        }
      )
    })
  })

  describe('accounts', () => {
    describe('addRoleToAccount', () => {
      scenario(
        'adds the specified role to the given account',
        async (scenario: RoleStandard) => {
          const acc = scenario.account.two as Account
          const accountId = acc.id

          const role = scenario.role.two as Role
          const roleId = role.id

          // @ts-expect-error jest typings
          writeTuple.mockResolvedValue({})

          await addRoleToAccount({ accountId, roleId })

          const dbRes = await db.account.findFirst({
            where: {
              id: accountId,
              roles: {
                some: {
                  id: roleId,
                },
              },
            },
          })

          expect(dbRes).toEqual(expect.objectContaining(acc))
        }
      )

      scenario(
        'attempts to write a relation-tuple to Keto',
        async (scenario: RoleStandard) => {
          const acc = scenario.account.two as Account
          const accountId = acc.id

          const role = scenario.role.two as Role
          const roleId = role.id

          // @ts-expect-error jest typings
          writeTuple.mockResolvedValue({})

          await addRoleToAccount({ accountId, roleId })

          expect(writeTuple).toHaveBeenCalledTimes(1)
          expect(writeTuple).toHaveBeenCalledWith(
            buildAccountRoleTuple(accountId, roleId)
          )
        }
      )
    })

    describe('delRoleFromAccount', () => {
      scenario(
        'deletes the specified role from the given account',
        async (scenario: RoleStandard) => {
          const acc = scenario.account.two as Account
          const accountId = acc.id

          const role = scenario.role.two as Role
          const roleId = role.id

          // @ts-expect-error jest typings
          deleteTuple.mockResolvedValue({})

          await delRoleFromAccount({ accountId, roleId })

          const dbRes = await db.account.findFirst({
            where: {
              id: accountId,
              roles: {
                some: {
                  id: roleId,
                },
              },
            },
          })

          expect(dbRes).toBeNull()
        }
      )

      scenario(
        'attempts to delete a relation-tuple from Keto',
        async (scenario: RoleStandard) => {
          const acc = scenario.account.two as Account
          const accountId = acc.id

          const role = scenario.role.two as Role
          const roleId = role.id

          // @ts-expect-error jest typings
          deleteTuple.mockResolvedValue({})

          await delRoleFromAccount({ accountId, roleId })

          expect(deleteTuple).toHaveBeenCalledTimes(1)
          expect(deleteTuple).toHaveBeenCalledWith(
            buildAccountRoleTuple(accountId, roleId)
          )
        }
      )
    })
  })

  describe('permissions', () => {
    describe('addPermToRole', () => {
      scenario(
        'adds the specified permission to the given role',
        async (scenario: RoleStandard) => {
          const perm = scenario.permission.two as Permission
          const permissionId = perm.id

          const role = scenario.role.two as Role
          const roleId = role.id

          // @ts-expect-error jest typings
          writeTuple.mockResolvedValue({})

          await addPermToRole({ permissionId, roleId })

          const dbRes = await db.permission.findFirst({
            where: {
              id: permissionId,
              roles: {
                some: {
                  id: roleId,
                },
              },
            },
          })

          expect(dbRes).toEqual(expect.objectContaining(perm))
        }
      )

      scenario(
        'attempts to write a relation-tuple to Keto',
        async (scenario: RoleStandard) => {
          const perm = scenario.permission.two as Permission
          const permissionId = perm.id
          const { namespace, object, relation } = perm

          const role = scenario.role.two as Role
          const roleId = role.id

          // @ts-expect-error jest typings
          writeTuple.mockResolvedValue({})

          await addPermToRole({ permissionId, roleId })

          const tuple = {
            namespace,
            object,
            relation,
            subject: buildPermissionSubjectSet(roleId),
          }

          expect(writeTuple).toHaveBeenCalledTimes(1)
          expect(writeTuple).toHaveBeenCalledWith(tuple)
        }
      )
    })

    describe('delPermFromRole', () => {
      scenario(
        'deletes the specified permission from the given role',
        async (scenario: RoleStandard) => {
          const perm = scenario.permission.two as Permission
          const permissionId = perm.id

          const role = scenario.role.two as Role
          const roleId = role.id

          // @ts-expect-error jest typings
          deleteTuple.mockResolvedValue({})

          await delPermFromRole({ permissionId, roleId })

          const dbRes = await db.permission.findFirst({
            where: {
              id: permissionId,
              roles: {
                some: {
                  id: roleId,
                },
              },
            },
          })

          expect(dbRes).toBeNull()
        }
      )

      scenario(
        'attempts to delete a relation-tuple from Keto',
        async (scenario: RoleStandard) => {
          const perm = scenario.permission.two as Permission
          const permissionId = perm.id
          const { namespace, object, relation } = perm

          const role = scenario.role.two as Role
          const roleId = role.id

          // @ts-expect-error jest typings
          deleteTuple.mockResolvedValue({})

          await delPermFromRole({ permissionId, roleId })

          const tuple = {
            namespace,
            object,
            relation,
            subject: buildPermissionSubjectSet(roleId),
          }

          expect(deleteTuple).toHaveBeenCalledTimes(1)
          expect(deleteTuple).toHaveBeenCalledWith(tuple)
        }
      )
    })
  })
})
