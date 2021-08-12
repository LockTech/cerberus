import type { Role } from '@prisma/client'
import { BeforeResolverSpecType, UserInputError } from '@redwoodjs/api'

import {
  KetoBuildAccountTuple,
  KetoBuildPermissionTuple,
} from 'src/constants/keto'

import { deleteTuple, writeTuple } from 'src/helpers/keto'

import { getContextUser } from 'src/lib/context'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { permission as getPermission } from 'src/services/permissions'

import { validateAccountID } from 'src/validators/account'
import { validateAuth } from 'src/validators/auth'
import { validatePermissionId } from 'src/validators/permission'
import { reject } from 'src/validators/reject'
import { validateRoleId, validateRoleName } from 'src/validators/role'

/* eslint-disable prettier/prettier */
const validateRoleAccountId = (s, { accountId }) => validateAccountID(s, { id: accountId })
const validateRolePermissionId = (s, { permissionId }) => validatePermissionId(s, { id: permissionId })
const validateRoleIdEx = (s, { roleId }) => validateRoleId(s, { id: roleId })

export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(reject, { only: ['deleteAllRoles'] })
  rules.add(validateAuth)
  rules.add(validateRoleId, { only: ['role', 'updateRole', 'deleteRole'] })
  rules.add(validateRoleName, { only: ['createRole', 'updateRole'] })
  rules.add(validateRoleAccountId, { only: ['addRoleToAccount', 'delRoleFromAccount'] })
  rules.add(validateRolePermissionId, { only: ['addPermToRole', 'delPermFromRole'] })
  rules.add(validateRoleIdEx, { only: ['addPermToRole', 'addRoleToAccount', 'delPermFromRole', 'delRoleFromAccount'] })
}
/* eslint-enable prettier/prettier */

export interface CreateRoleArgs {
  name: string
}
/**
 * @throws
 *  * 'role-create' - When an error occurs creating the role in the DB.
 */
export const createRole = async ({ name }: CreateRoleArgs) => {
  const organizationId = getContextUser().organizationId

  let res: Role

  try {
    res = await db.role.create({
      data: {
        organizationId,
        name,
      },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error creating role.')
    throw new UserInputError('role-create')
  }

  return res
}

export interface RoleArgs {
  id: string
}
/**
 * @throws
 *  * 'role-read' - When an error occurs reading a role from the DB.
 */
export const role = async ({ id }: RoleArgs) => {
  const organizationId = getContextUser().organizationId

  let res: Role

  try {
    res = await db.role.findFirst({ where: { id, organizationId } })
  } catch (err) {
    logger.error({ err }, 'Prisma error reading role.')
    throw new UserInputError('role-read')
  }

  return res
}

/**
 * @throws
 *  * 'role-read' - When an error occurs reading roles from the DB.
 */
export const roles = async () => {
  const organizationId = getContextUser().organizationId

  let res: Role[]

  try {
    res = await db.role.findMany({ where: { organizationId } })
  } catch (err) {
    logger.error({ err }, 'Prisma error listing roles.')
    throw new UserInputError('role-read')
  }

  return res
}

export interface UpdateRoleArgs {
  id: string
  name: string
}
/**
 * @throws
 *  * 'role-update' - When an error occurs updating the role in the DB.
 */
export const updateRole = async ({ id, name }: UpdateRoleArgs) => {
  let res: Role

  try {
    res = await db.role.update({
      data: { name },
      where: { id },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error updating a role.')
    throw new UserInputError('role-update')
  }

  return res
}

export interface DeleteRoleArgs {
  id: string
}
/**
 * @throws
 *  * 'role-delete' - When an error occurs deleting the role from the DB.
 */
export const deleteRole = async ({ id }: DeleteRoleArgs) => {
  let res: Role

  const roleRelations = await db.role.findUnique({
    select: {
      accounts: {
        select: {
          id: true,
        },
      },
      permissions: {
        select: {
          namespace: true,
          object: true,
          relation: true,
        },
      },
    },
    where: { id },
  })
  roleRelations.permissions.forEach(async (perm) => {
    await deleteTuple({ ...perm, subject: KetoBuildPermissionTuple(id) })
  })
  roleRelations.accounts.forEach(async (account) => {
    await deleteTuple(KetoBuildAccountTuple(account.id, id))
  })

  try {
    res = await db.role.delete({ where: { id } })
  } catch (err) {
    logger.error({ err }, 'Prisma error deleting role.')
    throw new UserInputError('role-delete')
  }

  return res
}

export const deleteAllRoles = async () => {
  const organizationId = getContextUser().organizationId

  const roles = await db.role.findMany({
    select: {
      id: true,
      accounts: {
        select: {
          id: true,
        },
      },
      permissions: {
        select: {
          namespace: true,
          object: true,
          relation: true,
        },
      },
    },
    where: { organizationId },
  })

  try {
    roles.forEach((role) => {
      const id = role.id
      role.permissions.forEach(async (perm) => {
        await deleteTuple({ ...perm, subject: KetoBuildPermissionTuple(id) })
      })
      role.accounts.forEach(async (account) => {
        await deleteTuple(KetoBuildAccountTuple(account.id, id))
      })
    })

    await db.role.deleteMany({ where: { organizationId } })
  } catch (err) {
    logger.error(
      { err },
      "Prisma error deleting all role's accounts and permissions."
    )
    throw new UserInputError('roles-delete')
  }

  return true
}

// --

export interface AddPermToRoleArgs {
  permissionId: string
  roleId: string
}
export const addPermToRole = async ({
  permissionId,
  roleId,
}: AddPermToRoleArgs) => {
  const permission = await getPermission({ id: permissionId })

  const { namespace, object, relation } = permission
  await writeTuple({
    namespace,
    object,
    relation,
    subject: KetoBuildPermissionTuple(roleId),
  })

  let res: Role

  try {
    res = await db.role.update({
      data: {
        permissions: {
          connect: {
            id: permissionId,
          },
        },
      },
      where: { id: roleId },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error adding permission to role.')
    throw new UserInputError('role-add-permission')
  }

  return res
}

export interface AddRoleToAccountArgs {
  accountId: string
  roleId: string
}
export const addRoleToAccount = async ({
  accountId,
  roleId,
}: AddRoleToAccountArgs) => {
  await writeTuple(KetoBuildAccountTuple(accountId, roleId))

  let res: Role

  try {
    res = await db.role.update({
      data: {
        accounts: {
          connect: {
            id: accountId,
          },
        },
      },
      where: { id: roleId },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error adding role to account.')
    throw new UserInputError('role-add-account')
  }

  return res
}

export interface DelPermFromRoleArgs {
  permissionId: string
  roleId: string
}
export const delPermFromRole = async ({
  permissionId,
  roleId,
}: DelPermFromRoleArgs) => {
  const permission = await getPermission({ id: permissionId })

  const { namespace, object, relation } = permission
  await deleteTuple({
    namespace,
    object,
    relation,
    subject: KetoBuildPermissionTuple(roleId),
  })

  let res: Role

  try {
    res = await db.role.update({
      data: {
        permissions: {
          disconnect: {
            id: permissionId,
          },
        },
      },
      where: { id: roleId },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error removing permission from role.')
    throw new UserInputError('role-remove-permission')
  }

  return res
}

export interface DelRoleFromAccountArgs {
  accountId: string
  roleId: string
}
export const delRoleFromAccount = async ({
  accountId,
  roleId,
}: DelRoleFromAccountArgs) => {
  await deleteTuple(KetoBuildAccountTuple(accountId, roleId))

  let res: Role

  try {
    res = await db.role.update({
      data: {
        accounts: {
          disconnect: {
            id: accountId,
          },
        },
      },
      where: { id: roleId },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error removing role from account.')
    throw new UserInputError('role-remove-account')
  }

  return res
}
