import type { Account, Organization } from '@prisma/client'
import {
  BeforeResolverSpecType,
  setContext,
  UserInputError,
} from '@redwoodjs/api'

import { CerberusAdminTuple } from 'src/constants/permission'

import { getContextUser } from 'src/lib/context'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { permission as getPermission } from 'src/services/permissions'
import {
  addPermToRole,
  addRoleToAccount,
  createRole,
  deleteRole,
} from 'src/services/roles'

import { validateAuth, validateAuthId } from 'src/validators/auth'
import { validateOrganizationName } from 'src/validators/organization/organization'
import { validateRoleName } from 'src/validators/role'

/* eslint-disable prettier/prettier */
const valCreateRoleName = (s: string, { adminRoleName }) => validateRoleName(s, { name: adminRoleName })
const valUpdateRoleName = (s: string, { name }) => name && validateOrganizationName(s, { name })

export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(validateAuth, { except: ['createOrganization'] })
  rules.add([validateAuthId, validateOrganizationName, valCreateRoleName], { only: ['createOrganization'] })
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
    logger.error({ err }, 'Prisma error creating organization.')
    throw new UserInputError('organization-create')
  }

  let role = await createRole({ name: adminRoleName })
  const roleId = role.id

  const permission = await getPermission({ tuple: CerberusAdminTuple })
  const permissionId = permission.id

  // perm->role
  try {
    role = await addPermToRole({ permissionId, roleId })
  } catch (err) {
    logger.error({ err }, 'Error adding admin permission to role.')

    await db.account.update({
      data: {
        organization: {
          delete: true,
        },
      },
      where: { id: accountId },
    })

    throw err
  }
  // role->account
  try {
    role = await addRoleToAccount({ accountId, roleId })
  } catch (err) {
    logger.error({ err }, 'Error adding admin role to account.')

    await deleteRole({ id: roleId })

    await db.account.update({
      data: {
        organization: {
          delete: true,
        },
      },
      where: { id: accountId },
    })

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
    logger.error({ err }, 'Prisma error getting organization.')
    throw new UserInputError('organization-get')
  }

  return res
}
