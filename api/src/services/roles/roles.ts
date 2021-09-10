import type { Role } from '@prisma/client'
import { BeforeResolverSpecType, UserInputError } from '@redwoodjs/api'

import {
  KetoBuildAccountRoleTuple,
  KetoBuildOrgRoleTuple,
  KetoBuildPermissionTuple,
} from 'src/constants/keto'

import { deleteTuple, writeTuple } from 'src/helpers/keto'

import { getContextUser } from 'src/lib/context'
import { db } from 'src/lib/db'
import { prismaLogger } from 'src/lib/logger'

import { permission as getPermission } from 'src/services/permissions'

import { validateAccountID } from 'src/validators/account'
import { validateAuth } from 'src/validators/auth'
import { validatePermissionId } from 'src/validators/permission'
import { reject } from 'src/validators/reject'
import { validateRoleId, validateRoleName } from 'src/validators/role'

/* eslint-disable prettier/prettier */
const valUpdateRoleName = (s: string, { name }) => name && validateRoleName(s, { name })

const validateRoleAccountId = (s: string, { accountId }) => validateAccountID(s, { id: accountId })
const validateRolePermissionId = (s: string, { permissionId }) => validatePermissionId(s, { id: permissionId })
const validateRoleIdEx = (s: string, { roleId }) => validateRoleId(s, { id: roleId })

const validateRoleAccountIdEx = (s: string, { accountId }) => accountId && validateAccountID(s, { id: accountId })

export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(reject, { only: ['deleteAllRoles'] })
  rules.add(validateAuth)
  rules.add(validateRoleId, { only: ['role', 'updateRole', 'deleteRole'] })
  rules.add(validateRoleName, { only: ['createRole'] })
  rules.add(valUpdateRoleName, { only: ['updateRole'] })
  rules.add(validateRoleAccountIdEx, { only: ['roles'] })
  // --
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
    prismaLogger.error({ err }, 'Error creating role.')
    throw new UserInputError('role-create')
  }

  const tuple = KetoBuildOrgRoleTuple(organizationId, res.id)
  await writeTuple(tuple)

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
    prismaLogger.error({ err }, 'Error reading role.')
    throw new UserInputError('role-read')
  }

  return res
}

export interface RolesArgs {
  accountId?: string
}
/**
 * @param accountId - Exclude roles which are assigned to `accountId`.
 * @throws
 *  * 'roles-read' - When an error occurs reading roles from the DB.
 */
export const roles = async ({ accountId }: RolesArgs) => {
  const organizationId = getContextUser().organizationId

  let res: Role[]

  const accountExclusion = accountId && {
    NOT: { accounts: { some: { id: accountId } } },
  }

  try {
    res = await db.role.findMany({
      orderBy: { createdAt: 'asc' },
      where: { organizationId, ...accountExclusion },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error listing roles.')
    throw new UserInputError('roles-read')
  }

  return res
}

export interface UpdateRoleArgs {
  color: string
  id: string
  name: string
}
/**
 * @throws
 *  * 'role-update' - When an error occurs updating the role in the DB.
 */
export const updateRole = async ({ color, id, name }: UpdateRoleArgs) => {
  let res: Role

  try {
    res = await db.role.update({
      data: { color, name },
      where: { id },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error updating a role.')
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

  let roleRelations: {
    accounts: { id: string }[]
    permissions: {
      object: string
      namespace: string
      relation: string
    }[]
  }

  try {
    roleRelations = await db.role.findUnique({
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
  } catch (err) {
    prismaLogger.error(
      { err },
      'Error retrieving role account and permission relations.'
    )
    throw new UserInputError('role-delete')
  }

  roleRelations.permissions.forEach(async (perm) => {
    const tuple = KetoBuildPermissionTuple({ ...perm, roleId: id })

    await deleteTuple(tuple)
  })
  roleRelations.accounts.forEach(async (account) => {
    const tuple = KetoBuildAccountRoleTuple(account.id, id)

    await deleteTuple(tuple)
  })

  const organizationId = getContextUser().organizationId

  const tuple = KetoBuildOrgRoleTuple(organizationId, id)
  await deleteTuple(tuple)

  try {
    res = await db.role.delete({ where: { id } })
  } catch (err) {
    prismaLogger.error({ err }, 'Error deleting role.')
    throw new UserInputError('role-delete')
  }

  return res
}

/**
 * @throws
 *  * 'roles-delete' - When an error occurs deleting all roles from the DB.
 */
export const deleteAllRoles = async () => {
  const organizationId = getContextUser().organizationId

  let roles: {
    id: string
    accounts: { id: string }[]
    permissions: {
      object: string
      namespace: string
      relation: string
    }[]
  }[]

  try {
    roles = await db.role.findMany({
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
  } catch (err) {
    prismaLogger.error({ err }, 'Error retrieving all role relations.')

    throw new UserInputError('roles-delete')
  }

  roles.forEach(async (role) => {
    const roleId = role.id
    role.permissions.forEach(async (perm) => {
      const tuple = KetoBuildPermissionTuple({ ...perm, roleId })

      await deleteTuple(tuple)
    })
    role.accounts.forEach(async (account) => {
      const tuple = KetoBuildAccountRoleTuple(account.id, roleId)

      await deleteTuple(tuple)
    })

    const tuple = KetoBuildOrgRoleTuple(organizationId, roleId)
    await deleteTuple(tuple)
  })

  try {
    await db.role.deleteMany({ where: { organizationId } })
  } catch (err) {
    prismaLogger.error({ err }, 'Error deleting all roles.')
    throw new UserInputError('roles-delete')
  }

  return true
}

// --

export interface AddPermToRoleArgs {
  permissionId: string
  roleId: string
}
/**
 * @throws
 *  * 'role-add-permission' - When an error occurs adding a permission to a role.
 */
export const addPermToRole = async ({
  permissionId,
  roleId,
}: AddPermToRoleArgs) => {
  const permission = await getPermission({ id: permissionId })
  const { namespace, object, relation } = permission
  const tuple = KetoBuildPermissionTuple({
    namespace,
    object,
    relation,
    roleId,
  })

  await writeTuple(tuple)

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
    prismaLogger.error({ err }, 'Error adding permission to role.')
    throw new UserInputError('role-add-permission')
  }

  return res
}

export interface AddRoleToAccountArgs {
  accountId: string
  roleId: string
}
/**
 * @throws
 *  * 'role-add-account' - When an error occurs adding a role to an account.
 */
export const addRoleToAccount = async ({
  accountId,
  roleId,
}: AddRoleToAccountArgs) => {
  const tuple = KetoBuildAccountRoleTuple(accountId, roleId)

  await writeTuple(tuple)

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
    prismaLogger.error({ err }, 'Error adding role to account.')
    throw new UserInputError('role-add-account')
  }

  return res
}

export interface DelPermFromRoleArgs {
  permissionId: string
  roleId: string
}
/**
 * @throws
 * * 'role-delete-permission' - When an error occurs deleting a permission from a role.
 */
export const delPermFromRole = async ({
  permissionId,
  roleId,
}: DelPermFromRoleArgs) => {
  const permission = await getPermission({ id: permissionId })
  const { namespace, object, relation } = permission
  const tuple = KetoBuildPermissionTuple({
    namespace,
    object,
    relation,
    roleId,
  })

  await deleteTuple(tuple)

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
    prismaLogger.error({ err }, 'Error removing permission from role.')
    throw new UserInputError('role-delete-permission')
  }

  return res
}

export interface DelRoleFromAccountArgs {
  accountId: string
  roleId: string
}
/**
 * @throws
 *  * 'role-delete-account' - When an error occurs deleting a role from an account.
 */
export const delRoleFromAccount = async ({
  accountId,
  roleId,
}: DelRoleFromAccountArgs) => {
  const tuple = KetoBuildAccountRoleTuple(accountId, roleId)

  await deleteTuple(tuple)

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
    prismaLogger.error({ err }, 'Error removing role from account.')
    throw new UserInputError('role-delete-account')
  }

  return res
}
