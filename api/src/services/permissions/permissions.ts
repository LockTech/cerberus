import type { Permission } from '@prisma/client'
import { UserInputError } from '@redwoodjs/api'
import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import {
  validateAccountOrganization,
  validateCurrentUser,
} from 'src/validators/account'
import { reject } from 'src/validators/rejector'

//
export interface PermissionTuple {
  application: string
  namespace: string
  object: string
  relation: string
}
//

// ==
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(validateCurrentUser)
  rules.add(validateAccountOrganization)
  rules.add(reject, { only: ['createPermission'] })
}
//

// == C
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
//

// == R
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
//
