import type { Account, Organization, Permission, Role } from '@prisma/client'

import {
  KetoBuildAccountRoleTuple,
  KetoBuildOrgRoleTuple,
  KetoBuildPermissionTuple,
} from 'src/constants/keto'

import { db } from 'src/lib/db'

import { deleteTuple, writeTuple } from 'src/helpers/keto'

import {
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
      'attempts to write an organization relation tuple',
      async (scenarios: RoleStandard) => {
        const org = scenarios.organization.one as Organization
        const organizationId = org.id

        mockCurrentUser({ organizationId })

        // @ts-expect-error jest typings
        writeTuple.mockResolvedValue(null)

        const name = 'Moderator'

        const res = await createRole({ name })

        const tuple = KetoBuildOrgRoleTuple(organizationId, res.id)

        expect(writeTuple).toHaveBeenCalledTimes(1)
        expect(writeTuple).toHaveBeenCalledWith(tuple)
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
      "attempts to delete the role's account relation tuples",
      async (scenario: RoleStandard) => {
        // @ts-expect-error jest typings
        deleteTuple.mockResolvedValue(null)

        const role = scenario.role.one as Role
        const id = role.id
        const organizationId = role.organizationId

        const acc = scenario.account.one as Account
        const accId = acc.id
        const accTuple = KetoBuildAccountRoleTuple(accId, id)

        mockCurrentUser({ organizationId })

        await deleteRole({ id })

        expect(deleteTuple).toHaveBeenNthCalledWith(4, accTuple)
      }
    )

    scenario(
      "attempts to delete each role's permission relation tuples",
      async (scenario: RoleStandard) => {
        // @ts-expect-error jest typings
        deleteTuple.mockResolvedValue(null)

        const role = scenario.role.one as Role
        const id = role.id
        const organizationId = role.organizationId

        const perm = scenario.permission.one as Permission
        const { namespace, object, relation } = perm
        const permTuple = KetoBuildPermissionTuple({
          namespace,
          object,
          relation,
          roleId: id,
        })

        mockCurrentUser({ organizationId })

        await deleteRole({ id })

        expect(deleteTuple).toHaveBeenNthCalledWith(1, permTuple)
      }
    )

    scenario(
      "attempts to delete the role's organization relation tuple",
      async (scenario: RoleStandard) => {
        // @ts-expect-error jest typings
        deleteTuple.mockResolvedValue(null)

        const role = scenario.role.one as Role
        const id = role.id
        const organizationId = role.organizationId

        const tuple = KetoBuildOrgRoleTuple(organizationId, id)

        mockCurrentUser({ organizationId })

        await deleteRole({ id })

        expect(deleteTuple).toHaveBeenNthCalledWith(5, tuple)
      }
    )

    scenario(
      'attempts to delete the expected number of relation tuples',
      async (scenario: RoleStandard) => {
        // @ts-expect-error jest typings
        deleteTuple.mockResolvedValue(null)

        const role = scenario.role.one as Role
        const id = role.id
        const organizationId = role.organizationId

        mockCurrentUser({ organizationId })

        await deleteRole({ id })

        expect(deleteTuple).toHaveBeenCalledTimes(5)
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

          const tuple = KetoBuildPermissionTuple({
            namespace,
            object,
            relation,
            roleId,
          })

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
        'attempts to delete all permission relation tuples',
        async (scenario: RoleStandard) => {
          const organization = scenario.organization.one as Organization
          const organizationId = organization.id
          mockCurrentUser({ organizationId })

          // @ts-expect-error jest typings
          deleteTuple.mockResolvedValue(null)

          const role1 = scenario.role.one as Role
          const role1Id = role1.id
          const role2 = scenario.role.two as Role
          const role2Id = role2.id

          const perm1 = scenario.permission.one as Permission
          const perm2 = scenario.permission.two as Permission
          const perm3 = scenario.permission.three as Permission

          const tuple1 = KetoBuildPermissionTuple({ ...perm1, roleId: role1Id })
          const tuple2 = KetoBuildPermissionTuple({ ...perm2, roleId: role1Id })
          const tuple3 = KetoBuildPermissionTuple({ ...perm3, roleId: role1Id })
          const tuple4 = KetoBuildPermissionTuple({ ...perm3, roleId: role2Id })

          await deleteAllRoles()

          expect(deleteTuple).toHaveBeenNthCalledWith(1, tuple1)
          expect(deleteTuple).toHaveBeenNthCalledWith(2, tuple2)
          expect(deleteTuple).toHaveBeenNthCalledWith(3, tuple3)
          expect(deleteTuple).toHaveBeenNthCalledWith(6, tuple4)
        }
      )

      scenario(
        'attempts to delete all account relation tuples',
        async (scenario: RoleStandard) => {
          const role1 = scenario.role.one as Role
          const role1Id = role1.id

          const role4 = scenario.role.four as Role
          const role4Id = role4.id

          const organizationId = role1.organizationId

          mockCurrentUser({ organizationId })

          const acc1 = scenario.account.one as Account
          const account1Id = acc1.id
          const acc2 = scenario.account.two as Account
          const account2Id = acc2.id

          const tuple1 = KetoBuildAccountRoleTuple(account1Id, role1Id)
          const tuple2 = KetoBuildAccountRoleTuple(account2Id, role4Id)

          // @ts-expect-error jest typings
          deleteTuple.mockResolvedValue(null)

          await deleteAllRoles()

          expect(deleteTuple).toHaveBeenNthCalledWith(4, tuple1)
          expect(deleteTuple).toHaveBeenNthCalledWith(8, tuple2)
        }
      )

      scenario(
        'attempts to delete all organization relation tuples',
        async (scenario: RoleStandard) => {
          const organization = scenario.organization.one as Organization
          const organizationId = organization.id
          mockCurrentUser({ organizationId })

          // @ts-expect-error jest typings
          deleteTuple.mockResolvedValue(null)

          const role1 = scenario.role.one as Role
          const role1Id = role1.id
          const role2 = scenario.role.two as Role
          const role2Id = role2.id
          const role4 = scenario.role.four as Role
          const role4Id = role4.id

          const tuple1 = KetoBuildOrgRoleTuple(organizationId, role1Id)
          const tuple2 = KetoBuildOrgRoleTuple(organizationId, role2Id)
          const tuple3 = KetoBuildOrgRoleTuple(organizationId, role4Id)

          await deleteAllRoles()

          expect(deleteTuple).toHaveBeenNthCalledWith(5, tuple1)
          expect(deleteTuple).toHaveBeenNthCalledWith(7, tuple2)
          expect(deleteTuple).toHaveBeenNthCalledWith(9, tuple3)
        }
      )

      scenario(
        'attempts to delete the expected number of relation tuples',
        async (scenario: RoleStandard) => {
          const organization = scenario.organization.one as Organization
          const organizationId = organization.id
          mockCurrentUser({ organizationId })

          // @ts-expect-error jest typings
          deleteTuple.mockResolvedValue(null)

          await deleteAllRoles()

          expect(deleteTuple).toHaveBeenCalledTimes(9)
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
            KetoBuildAccountRoleTuple(accountId, roleId)
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
            KetoBuildAccountRoleTuple(accountId, roleId)
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

          const tuple = KetoBuildPermissionTuple({
            namespace,
            object,
            relation,
            roleId,
          })

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

          const tuple = KetoBuildPermissionTuple({
            namespace,
            object,
            relation,
            roleId,
          })

          expect(deleteTuple).toHaveBeenCalledTimes(1)
          expect(deleteTuple).toHaveBeenCalledWith(tuple)
        }
      )
    })
  })
})
