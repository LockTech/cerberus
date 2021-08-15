import type { Account, Organization, Permission, Role } from '@prisma/client'
import {
  BeforeResolverSpecType,
  setContext,
  UserInputError,
} from '@redwoodjs/api'

import { KetoBuildOrgMemberTuple } from 'src/constants/keto'

import { CerberusAdminTuple } from 'src/constants/permission'

import { writeTuple } from 'src/helpers/keto'

import { getContextUser } from 'src/lib/context'
import { db } from 'src/lib/db'
import { logger, prismaLogger } from 'src/lib/logger'

import { deleteAllAccounts } from 'src/services/accounts'
import { permission as getPermission } from 'src/services/permissions'
import {
  addPermToRole,
  addRoleToAccount,
  createRole,
  deleteAllRoles,
  deleteRole,
} from 'src/services/roles'

import {
  validateAuth,
  validateAuthId,
  validateAuthVerified,
} from 'src/validators/auth'
import { validateOrganizationName } from 'src/validators/organization/organization'
import { validateRoleName } from 'src/validators/role'

/* eslint-disable prettier/prettier */
const valCreateRoleName = (s: string, { adminRoleName }) => validateRoleName(s, { name: adminRoleName })
const valUpdateRoleName = (s: string, { name }) => name && validateOrganizationName(s, { name })

export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(validateAuth, { except: ['createOrganization'] })
  rules.add([validateAuthVerified, validateAuthId, validateOrganizationName, valCreateRoleName], { only: ['createOrganization'] })
  rules.add([valUpdateRoleName], { only: ['updateOrganization'] })
}
/* eslint-enable prettier/prettier */

export interface CreateOrganizationArgs {
  name: string
  adminRoleName: string
}
export const createOrganization = async ({
  name,
  adminRoleName,
}: CreateOrganizationArgs) => {
  const currentUser = getContextUser()
  const accountId = currentUser.id

  let res: Account & { organization: Organization }

  try {
    res = await db.account.update({
      data: {
        organization: {
          create: {
            name,
          },
        },
      },
      include: {
        organization: true,
      },
      where: { id: accountId },
    })

    setContext({
      currentUser: { ...currentUser, organizationId: res.organization.id },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error creating organization.')
    throw new UserInputError('organization-create')
  }

  const organizationId = res.organization.id

  const tuple = KetoBuildOrgMemberTuple(accountId, organizationId)
  await writeTuple(tuple)

  let role: Role

  try {
    role = await createRole({ name: adminRoleName })
  } catch (err) {
    logger.error({ err }, 'Error creating administrator role.')

    await db.organization.delete({ where: { id: organizationId } })

    throw err
  }

  const roleId = role.id
  let permission: Permission

  try {
    permission = await getPermission({ tuple: CerberusAdminTuple })
  } catch (err) {
    logger.error({ err }, 'Error creating administrator role.')

    await deleteRole({ id: roleId })

    await db.organization.delete({ where: { id: organizationId } })

    throw err
  }

  const permissionId = permission.id

  // perm->role
  try {
    role = await addPermToRole({ permissionId, roleId })
  } catch (err) {
    logger.error({ err }, 'Error adding admin permission to role.')

    await deleteRole({ id: roleId })

    await db.organization.delete({ where: { id: organizationId } })

    throw err
  }
  // role->account
  try {
    role = await addRoleToAccount({ accountId, roleId })
  } catch (err) {
    logger.error({ err, organizationId }, 'Error adding admin role to account.')

    await deleteRole({ id: roleId })

    await db.organization.delete({ where: { id: organizationId } })
    logger.error({ err, organizationId }, 'tried to delete org')

    throw err
  }

  return res.organization
}

/**
 * @throws
 *  * 'organization-get' - When an error occurs retrieving the organization from the database.
 */
export const organization = async () => {
  const id = getContextUser().organizationId

  let res: Organization

  try {
    res = await db.organization.findUnique({ where: { id } })
  } catch (err) {
    prismaLogger.error({ err }, 'Error getting organization.')
    throw new UserInputError('organization-get')
  }

  return res
}

export interface UpdateOrganizationArgs {
  name: string
}
/**
 * @throws
 *  * 'organization-update' - When an error occurs updating the organization in the DB.
 */
export const updateOrganization = async ({ name }: UpdateOrganizationArgs) => {
  const id = getContextUser().organizationId

  let res: Organization

  try {
    res = await db.organization.update({
      data: { name },
      where: { id },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error updating organization.')
    throw new UserInputError('organization-update')
  }

  return res
}

export const deleteOrganization = async () => {
  // Accounts & Roles
  try {
    await deleteAllAccounts()
    await deleteAllRoles()
  } catch (err) {
    logger.error({ err }, 'Error deleting organization accounts or roles.')
    throw err
  }

  const id = getContextUser().organizationId
  let res: Organization

  try {
    res = await db.organization.delete({ where: { id } })
  } catch (err) {
    prismaLogger.error({ err }, 'Error deleting organization.')
    throw new UserInputError('organization-delete')
  }

  return res
}
