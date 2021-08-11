import { validate as validateUUID } from 'uuid'
import type { Permission } from '@prisma/client'

import { db } from 'src/lib/db'

import { createPermission, permissions } from './permissions'
import type { PermissionStandard } from './permissions.scenarios'

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

    scenario(
      'creates a new permission assigning it a UUID',
      async (_scenario: PermissionStandard) => {
        const res = await createPermission(Tuple)

        expect(res.id).toBeDefined()
        expect(validateUUID(res.id)).toBeTruthy()
      }
    )
  })

  describe('list', () => {
    scenario(
      'lists all permissions in the database',
      async (scenario: PermissionStandard) => {
        const perm1 = scenario.permission.one as Permission
        const perm2 = scenario.permission.two as Permission

        const res = await permissions()

        expect(res).toEqual(expect.arrayContaining<Permission>([perm1, perm2]))
      }
    )
  })
})
