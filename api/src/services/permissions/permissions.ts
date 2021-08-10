import type { Permission } from '@prisma/client'
import { UserInputError } from '@redwoodjs/api'
import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { validateAuth } from 'src/validators/auth'
import { reject } from 'src/validators/reject'

export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(validateAuth)
  rules.add(reject, { only: ['createPermission'] })
}

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
    logger.error({ err }, 'Prisma error creating permission.')
    throw new UserInputError('permission-create')
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
    logger.error({ err }, 'Prisma error getting permissions.')
    throw new UserInputError('permission-get')
  }

  return res
}
