import type { Role } from '@prisma/client'
import { BeforeResolverSpecType, UserInputError } from '@redwoodjs/api'
import { getContextUser } from 'src/lib/context'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import {
  validateCurrentUser,
  validateAccountOrganization,
} from 'src/validators/account'

// ==
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(validateCurrentUser)
  rules.add(validateAccountOrganization)
}
//

// == C
export interface CreateRoleArgs {
  name: string
}
export const createRole = async ({ name }: CreateRoleArgs) => {
  const organizationId = getContextUser().organizationId

  if (await checkRoleExist({ name })) {
    throw new UserInputError('role-exist')
  }

  let res: Role

  try {
    res = await db.role.create({
      data: {
        name,
        organizationId,
      },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error creating role.')
    throw new UserInputError('role-create')
  }

  return res
}
//

// == R
export interface CheckRoleExistArgs {
  id?: string
  name?: string
}
export const checkRoleExist = async ({ id, name }: CheckRoleExistArgs) => {
  const organizationId = getContextUser().organizationId

  const roleExist = await db.role.count({ where: { id, name, organizationId } })

  return roleExist >= 1
}

export interface RoleArgs {
  id: string
}
export const role = async ({ id }: RoleArgs) => {
  const organizationId = getContextUser().organizationId

  let res: Role

  try {
    res = await db.role.findFirst({
      where: {
        id,
        organizationId,
      },
    })
  } catch (err) {
    throw new UserInputError('role-get')
  }

  return res
}

export const roles = async () => {
  const organizationId = getContextUser().organizationId

  let res: Role[]

  try {
    res = await db.role.findMany({
      where: { organizationId },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error getting roles.')
    throw new UserInputError('role-get')
  }

  return res
}
//

// ==
export interface DeleteRoleArgs {
  id: string
}
export const deleteRole = async ({ id }: DeleteRoleArgs) => {
  if (await checkRoleExist({ id })) {
    throw new UserInputError('role-exist')
  }

  let res: Role

  try {
    res = await db.role.delete({
      where: { id },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error deleting role.')
    throw new UserInputError('role-delete')
  }

  return res
}
//
