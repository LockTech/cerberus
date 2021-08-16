import type { Permission, Role } from '@prisma/client'
import { KetoBuildPermissionTuple } from 'src/constants/keto'

import { deleteTuple } from 'src/helpers/keto'

import { db } from 'src/lib/db'

import { createPermission, deletePermission, permissions } from './permissions'
import type { PermissionStandard } from './permissions.scenarios'

jest.mock('../../helpers/keto/keto')

const Create = {
  name: 'UserInputError',
  message: 'permission-create',
}

const Tuple = {
  application: 'foos_bookstore',
  namespace: 'foos_bookstore',
  relation: 'publish_books',
}

describe('permissions service', () => {
  describe('create', () => {
    scenario(
      'throws when encountering a prisma error',
      async (scenario: PermissionStandard) => {
        const perm = scenario.permission.one as Permission
        const application = perm.application
        const namespace = perm.namespace
        const object = perm.object
        const relation = perm.relation
        const tuple = { application, namespace, object, relation }

        expect(createPermission(tuple)).rejects.toThrow(Create)
      }
    )

    scenario(
      'returns the created permission after completion',
      async (_scenario: PermissionStandard) => {
        const res = await createPermission(Tuple)

        const dbRes = await db.permission.findFirst({ where: Tuple })

        // @ts-expect-error checking for partial object
        expect(dbRes).toEqual(expect.objectContaining<Permission>(Tuple))
        expect(dbRes).toEqual(expect.objectContaining<Permission>(res))
      }
    )

    scenario(
      'creates a new permission using a given PermissionTuple',
      async (_scenario: PermissionStandard) => {
        const res = await createPermission(Tuple)

        // @ts-expect-error checking for partial object
        expect(res).toEqual(expect.objectContaining<Permission>(Tuple))
      }
    )
  })

  describe('read', () => {
    describe('list', () => {
      scenario(
        'lists all permissions in the database',
        async (scenario: PermissionStandard) => {
          const perm1 = scenario.permission.one as Permission
          const perm2 = scenario.permission.two as Permission

          const res = await permissions()

          expect(res).toEqual(
            expect.arrayContaining<Permission>([perm1, perm2])
          )
        }
      )
    })
  })

  describe('delete', () => {
    scenario(
      'deletes the permission from the database',
      async (scenario: PermissionStandard) => {
        // @ts-expect-error jest types
        deleteTuple.mockResolvedValue(null)

        const perm = scenario.permission.one as Permission
        const id = perm.id
        const { application, namespace, object, relation } = perm
        const where = { application, namespace, object, relation }

        const preDbRes = await db.permission.findUnique({ where: { id } })
        const res = await deletePermission(where)
        const postDbRes = await db.permission.findUnique({ where: { id } })

        expect(preDbRes).toEqual(expect.objectContaining(perm))
        expect(res).toEqual(expect.objectContaining(perm))
        expect(postDbRes).toBeNull()
      }
    )

    scenario(
      'removes the permission-role relation from the database',
      async (scenario: PermissionStandard) => {
        // @ts-expect-error jest types
        deleteTuple.mockResolvedValue(null)

        const perm1 = scenario.permission.one as Permission
        const perm1Id = perm1.id
        const { application, namespace, object, relation } = perm1
        const where = { application, namespace, object, relation }

        const perm2 = scenario.permission.two as Permission
        const perm2Id = perm2.id

        const role = scenario.role.one as Role
        const roleId = role.id

        await deletePermission(where)

        const nullRes = await db.role.findFirst({
          where: {
            id: roleId,
            permissions: {
              some: {
                id: perm1Id,
              },
            },
          },
        })
        const foundRes = await db.role.findFirst({
          select: {
            permissions: {
              where: {
                id: perm2Id,
              },
            },
          },
          where: {
            id: roleId,
            permissions: {
              some: {
                id: perm2Id,
              },
            },
          },
        })

        expect(nullRes).toBeNull()
        expect(foundRes.permissions[0]).toEqual(expect.objectContaining(perm2))
      }
    )

    scenario(
      'attempts to delete the permission-role relation tuple',
      async (scenario: PermissionStandard) => {
        // @ts-expect-error jest types
        deleteTuple.mockResolvedValue(null)

        const perm = scenario.permission.one as Permission
        const { application, namespace, object, relation } = perm
        const where = { application, namespace, object, relation }

        const role = scenario.role.one as Role
        const roleId = role.id

        await deletePermission(where)

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
