import type { Organization } from '@prisma/client'
import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { getContextUser } from 'src/lib/context'
import { logger } from 'src/lib/logger'

import {
  validateCurrentUser,
  validateAccountOrganization,
} from 'src/validators/account'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add([validateCurrentUser])
  rules.add([validateAccountOrganization], { except: ['createOrganization'] })
}

// == C
//
export interface CreateOrganizationArgs {
  name: string
}
export const createOrganization = async ({ name }: CreateOrganizationArgs) => {
  const orgCount = await db.organization.count({ where: { name } })
  if (orgCount >= 1) {
    throw new SyntaxError('name-taken')
  }

  const currentAccount = getContextUser()
  const accountId = currentAccount.id

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
export const updateOrganization = async ({ name }: UpdateOrganizationArgs) => {
  const id = getContextUser().organizationId

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
