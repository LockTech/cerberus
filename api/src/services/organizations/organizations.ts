import type { Organization } from '@prisma/client'
import { UserInputError } from '@redwoodjs/graphql-server'
import type { BeforeResolverSpecType } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { getContextUser } from 'src/lib/context'
import { logger } from 'src/lib/logger'

import {
  validateCurrentUser,
  validateAccountOrganization,
  validateAccountId,
} from 'src/validators/account'
import {
  validateOrganizationExist,
  validateOrganizationName,
} from 'src/validators/organization'

// ==
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add([validateCurrentUser])
  rules.add([validateAccountId], { only: ['createOrganization'] })
  rules.add([validateAccountOrganization], { except: ['createOrganization'] })
  rules.add([validateOrganizationExist], { except: ['createOrganization'] })
  rules.add([validateOrganizationName], {
    only: ['createOrganization', 'updateOrganization'],
  })
}
//

// == C
//
export interface CreateOrganizationArgs {
  name: string
}
/**
 * @throws
 *  * 'organization-name-taken' - When `name` is in use by another organization; case insensitive.
 *  * 'organization-already-member' - When the creating account is already a member of an organization.
 *  * 'organization-create' - When the organization cannot be created in the DB.
 */
export const createOrganization = async ({ name }: CreateOrganizationArgs) => {
  if (await checkOrganizationExist({ name })) {
    throw new UserInputError('organization-name-taken')
  }

  const currentAccount = getContextUser()
  const accountOrgId = currentAccount.organizationId
  const accountId = currentAccount.id

  if (accountOrgId !== null) {
    throw new Error('organization-already-member')
  }

  let res: Organization

  try {
    res = await db.organization.create({
      data: {
        name,
      },
    })

    const organizationId = res.id

    await db.account.update({
      data: {
        organizationId,
      },
      where: {
        id: accountId,
      },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error creating organization.')
    throw new Error('organization-create')
  }

  return res
}
//

// == R
//
interface CheckOrganizationExistArgs {
  name?: string
}
const checkOrganizationExist = async ({ name }: CheckOrganizationExistArgs) => {
  let count: number

  try {
    count = await db.organization.count({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error checking organization exist.')
    throw new Error('check')
  }

  return count !== 0
}

/**
 * @throws
 *  * 'organization-get' - When an error occurs trying to retrieving the organization from the DB.
 */
export const organization = async () => {
  const id = getContextUser().organizationId

  let res: Organization

  try {
    res = await db.organization.findUnique({
      where: { id },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error getting organization.')
    throw new UserInputError('organization-get')
  }

  return res
}
//

// == U
//
export interface UpdateOrganizationArgs {
  name?: string
}
/**
 * @throws
 *  * 'organization-name-taken' - When `name` is in use by another organization; case insensitive.
 *  * 'organization-update' - When there is an error updating the organization in the DB.
 */
export const updateOrganization = async ({ name }: UpdateOrganizationArgs) => {
  if (await checkOrganizationExist({ name })) {
    throw new UserInputError('organization-name-taken')
  }

  const id = getContextUser().organizationId

  let res: Organization

  try {
    res = await db.organization.update({
      data: { name },
      where: { id },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error updating organization.')
    throw new UserInputError('organization-update')
  }

  return res
}
//

// == D
//
export const deleteOrganization = async () => {}
//
