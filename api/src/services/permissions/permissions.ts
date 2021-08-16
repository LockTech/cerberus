import type { Permission, Role } from '@prisma/client'
import { UserInputError } from '@redwoodjs/api'
import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { PermissionUndefinedTuple } from 'src/constants/permission'
import type { PermissionTuple } from 'src/constants/permission'

import { db } from 'src/lib/db'
import { prismaLogger } from 'src/lib/logger'

import { validateAuth } from 'src/validators/auth'
import { reject } from 'src/validators/reject'
import {
  validatePermissionId,
  validatePermissionTuple,
} from 'src/validators/permission'
import { KetoBuildPermissionTuple } from 'src/constants/keto'
import { deleteTuple } from 'src/helpers/keto'

/* eslint-disable prettier/prettier */
const valGetPermissionId = (s: string, { id }) => id && validatePermissionId(s, { id })
const valGetPermissionTuple = (s: string, { tuple }) => tuple && validatePermissionTuple(s, tuple)

export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(reject, { only: ['createPermission', 'deletePermission'] })
  rules.add(validateAuth)
  rules.add([valGetPermissionId, valGetPermissionTuple], { only: ['permission'] })
}
/* eslint-enable prettier/prettier */

/**
 * @throws
 *  * 'permission-create' - When an error occurs creating the permission in the DB.
 */
export interface CreatePermissionArgs {
  application: string
  namespace: string
  object?: string
  relation?: string
}
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
 *  * 'permission-get' - When an error occurs getting the permission from the DB.
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
    throw new UserInputError('permission-get')
  }

  return res
}

/**
 * @throws
 *  * 'permission-get' - When an error occurs getting the permission from the DB.
 */
export const permissions = async () => {
  let res: Permission[]

  try {
    res = await db.permission.findMany()
  } catch (err) {
    prismaLogger.error({ err }, 'Error getting permissions.')
    throw new UserInputError('permission-get')
  }

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
