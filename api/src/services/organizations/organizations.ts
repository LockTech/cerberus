import type { Account, Organization, Permission, Role } from '@prisma/client'
import { setContext, UserInputError } from '@redwoodjs/graphql-server'

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

import { validateOrganizationName } from 'src/validators/organization/organization'

export interface CreateOrganizationArgs {
  name: string
  adminRoleName: string
}
/**
 * @throws
 *  * 'organization-create' - When an error occurs while creating the organization in the DB.
 */
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

    await db.account.delete({ where: { id: accountId } })

    throw new UserInputError('organization-create')
  }

  const organization = res.organization
  const organizationId = res.organization.id

  const tuple = KetoBuildOrgMemberTuple(accountId, organizationId)
  await writeTuple(tuple)

  let role: Role

  try {
    role = await createRole({ name: adminRoleName })
  } catch (err) {
    logger.error({ err }, 'Error creating administrator role.')

    await db.organization.delete({ where: { id: organizationId } })

    await db.account.delete({ where: { id: accountId } })

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

    await db.account.delete({ where: { id: accountId } })

    throw err
  }

  if (permission === null) {
    logger.fatal("Cerberus' administrator permission has not been created.")

    await deleteRole({ id: roleId })

    await db.organization.delete({ where: { id: organizationId } })

    await db.account.delete({ where: { id: accountId } })

    throw new Error('Cerberus')
  }

  const permissionId = permission.id

  // perm->role
  try {
    role = await addPermToRole({ permissionId, roleId })
  } catch (err) {
    logger.error({ err }, 'Error adding admin permission to role.')

    await deleteRole({ id: roleId })

    await db.organization.delete({ where: { id: organizationId } })

    await db.account.delete({ where: { id: accountId } })

    throw err
  }
  // role->account
  try {
    role = await addRoleToAccount({ accountId, roleId })
  } catch (err) {
    logger.error({ err, organizationId }, 'Error adding admin role to account.')

    await deleteRole({ id: roleId })

    await db.organization.delete({ where: { id: organizationId } })

    await db.account.delete({ where: { id: accountId } })

    throw err
  }

  return organization
}

/**
 * @throws
 *  * 'organization-read' - When an error occurs retrieving the organization from the database.
 */
export const organization = async () => {
  const id = getContextUser().organizationId

  let res: Organization

  try {
    res = await db.organization.findUnique({ where: { id } })
  } catch (err) {
    prismaLogger.error({ err }, 'Error getting organization.')
    throw new UserInputError('organization-read')
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
  name && (await validateOrganizationName({ name }))

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

/**
 * @throws
 *  * 'organization-delete' - When an error occurs deleting the organization from the DB.
 */
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
    await db.account_Confirmation.deleteMany({ where: { organizationId: id } })

    res = await db.organization.delete({ where: { id } })
  } catch (err) {
    prismaLogger.error({ err }, 'Error deleting organization.')
    throw new UserInputError('organization-delete')
  }

  return res
}
