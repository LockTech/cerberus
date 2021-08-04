import type { Organization } from '@prisma/client'
import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { getContextUser } from 'src/lib/context'
import { logger } from 'src/lib/logger'

import {
  validateCurrentUser,
  validateAccountOrganization,
} from 'src/validators/account'
import { isDefined, isStr } from 'src/util/asserters'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add([validateCurrentUser])
  rules.add([validateAccountOrganization], { except: ['createOrganization'] })
}

// == Helpers
const isNameValid = (name: unknown) => {
  if (!isStr(name)) return false
  if (name === '') return false
  else return true
}
//

// == C
//
export interface CreateOrganizationArgs {
  name: string
}
/**
 * @throws
 *  * 'name-required' - When `name` is not a string or equals `''`.
 *  * 'name-taken' - When `name` is in use by another organization; case insensitive.
 *  * 'already-member' - When the creating account is already a member of an organization.
 *  * 'create' - When the organization cannot be created in the DB.
 */
export const createOrganization = async ({ name }: CreateOrganizationArgs) => {
  if (!isNameValid(name)) {
    throw new Error('name-required')
  }

  const exist = await checkOrganizationExist({ name })
  if (exist) {
    throw new Error('name-taken')
  }

  const currentAccount = getContextUser()
  const accountOrgId = currentAccount.organizationId
  const accountId = currentAccount.id

  if (accountOrgId !== null) {
    throw new Error('already-member')
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
    throw new Error('create')
  }

  return res
}
//

// == R
//
export interface CheckOrganizationExistArgs {
  name?: string
}
export const checkOrganizationExist = async ({
  name,
}: CheckOrganizationExistArgs) => {
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
 *  * 'get' - When an error occurs trying to retrieving the organization from the DB.
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
    throw new Error('get')
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
 *  * 'invalid-name' - When `name` is defined but not a string, or equals `''`.
 *  * 'update' - When there is an error updating the organization in the DB.
 */
export const updateOrganization = async ({ name }: UpdateOrganizationArgs) => {
  if (!isDefined(name) && !isNameValid(name)) {
    throw new Error('invalid-name')
  }

  const id = getContextUser().organizationId

  // https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined
  name = name === null ? undefined : name

  let res: Organization

  try {
    res = await db.organization.update({
      data: { name },
      where: { id },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error updating organization.')
    throw new Error('update')
  }

  return res
}
//

// == D
//
export const deleteOrganization = async () => {}
//
