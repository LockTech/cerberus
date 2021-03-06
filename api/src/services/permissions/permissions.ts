import type { Permission, Role } from '@prisma/client'
import { UserInputError } from '@redwoodjs/graphql-server'

import type { PermissionTuple } from 'src/constants/permission'

import { db } from 'src/lib/db'
import { prismaLogger } from 'src/lib/logger'

import { KetoBuildPermissionTuple } from 'src/constants/keto'
import { deleteTuple } from 'src/helpers/keto'

export const PermissionUndefinedTuple: PermissionTuple = {
  application: undefined,
  namespace: undefined,
  object: undefined,
  relation: undefined,
}

export interface CreatePermissionArgs {
  application: string
  namespace: string
  object?: string
  relation?: string
  access_relation?: string
}
/**
 * @throws
 *  * 'permission-create' - When an error occurs creating the permission in the DB.
 */
export const createPermission = async (data: CreatePermissionArgs) => {
  let res: Permission

  try {
    res = await db.permission.create({ data })
  } catch (err) {
    prismaLogger.error({ err }, 'Error creating permission.')
    throw new UserInputError('permission-create')
  }

  return res
}

export interface PermissionArgs {
  id?: string
  tuple?: PermissionTuple
}
/**
 * @throws
 *  * 'permission-read' - When an error occurs getting the permission from the DB.
 */
export const permission = async ({
  id,
  tuple: {
    application,
    namespace,
    object,
    relation,
  } = PermissionUndefinedTuple,
}: PermissionArgs) => {
  let res: Permission

  try {
    res = await db.permission.findFirst({
      where: {
        id,
        application,
        namespace,
        object,
        relation,
      },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error getting permission.')
    throw new UserInputError('permission-read')
  }

  return res
}

/**
 * @throws
 *  * 'permissions-read' - When an error occurs getting the permission from the DB.
 */
export const permissions = async () => {
  let res: Permission[]

  try {
    res = await db.permission.findMany()
  } catch (err) {
    prismaLogger.error({ err }, 'Error getting permissions.')
    throw new UserInputError('permissions-read')
  }

  return res
}

export const applicationPermissions = async () => {
  let permissions: Permission[]

  try {
    permissions = await db.permission.findMany()
  } catch (err) {
    prismaLogger.error({ err }, 'Error getting application permissions.')
    throw new UserInputError('permissions-read')
  }

  const appPermList: Record<string, Permission[]> = {}

  permissions.forEach((permission) => {
    const application = permission.application
    if (!Array.isArray(appPermList[application])) appPermList[application] = []
    appPermList[application].push(permission)
  })

  const res = []

  Object.keys(appPermList).forEach((application) => {
    res.push({
      application,
      permissions: appPermList[application],
    })
  })

  return res
}

export interface DeletePermissionArgs {
  application: string
  namespace: string
  object?: string
  relation?: string
}
/**
 * @throws
 *  * 'permission-delete' - When an error occurs deleting the permission from the DB.
 */
export const deletePermission = async ({
  application,
  namespace,
  object,
  relation,
}: DeletePermissionArgs) => {
  let res: Permission

  object = object || ''
  relation = relation || ''

  const where = {
    application_namespace_object_relation: {
      application,
      namespace,
      object,
      relation,
    },
  }

  let permRelations: { id: string; roles: Role[] }
  try {
    permRelations = await db.permission.findUnique({
      select: { id: true, roles: true },
      where,
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error retrieving permission-role relations.')
  }

  permRelations.roles.forEach(async ({ id: roleId }) => {
    const tuple = KetoBuildPermissionTuple({
      namespace,
      object,
      relation,
      roleId,
    })
    await deleteTuple(tuple)
  })

  try {
    res = await db.permission.delete({ where })
  } catch (err) {
    prismaLogger.error({ err }, 'Error deleting permission.')
    throw new UserInputError('permission-delete')
  }

  return res
}
