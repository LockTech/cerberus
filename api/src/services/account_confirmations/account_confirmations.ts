import type { Account_Confirmation } from '@prisma/client'
import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { reject } from 'src/validators/rejector'

//
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(reject, { except: ['confirmSignup'] })
  rules.skip({ only: ['confirmSignup'] })
}
//

// ==
export interface CreateInviteConfirmArgs {
  code: string
  email: string
  organizationId: string
}
export const createInviteConfirm = async ({
  code,
  email,
  organizationId,
}: CreateInviteConfirmArgs) => {
  try {
    await db.account_Confirmation.create({
      data: {
        code,
        email,
        organizationId,
        createdAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error creating invitation confirmation.')
    throw new Error('create')
  }

  return true
}

export interface CreateSignupConfirmArgs {
  code: string
  email: string
}
export const createSignupConfirm = async ({
  code,
  email,
}: CreateSignupConfirmArgs) => {
  try {
    await db.account_Confirmation.create({
      data: {
        code,
        email,
        createdAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error creating signup confirmation.')
    throw new Error('create')
  }

  return true
}
//

// ==
export interface ConfirmInvitationArgs {
  code: string
  email: string
}
/**
 * Determines if a given `code` and `email` combination are valid for an `invitation` to an organization.
 *
 * @returns - `false` if the combination are **not** valid.
 * @returns - the `Account_Confirmation` information if they are.
 */
export const confirmInvitation = async ({
  code,
  email,
}: ConfirmInvitationArgs) => {
  let res: Account_Confirmation

  try {
    res = await db.account_Confirmation.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        code,
        email,
      },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error getting invitation confirmation.')
    throw new Error('get')
  }

  if (res === null) return false

  if (res.organizationId === null) return false

  const id = res.id
  try {
    await db.account_Confirmation.delete({
      where: { id },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error deleting invitation confirmation.')
    throw new Error('delete')
  }

  return true
}

export interface ConfirmSignupArgs {
  code: string
  email: string
}
export const confirmSignup = async ({ code, email }: ConfirmSignupArgs) => {
  let res: Account_Confirmation

  try {
    res = await db.account_Confirmation.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        code,
        email,
      },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error getting signup confirmaton.')
    throw new Error('get')
  }

  if (res === null) return false

  if (res.organizationId !== null) return false

  try {
    await db.account.update({
      data: { verified: true, verifiedAt: new Date().toISOString() },
      where: { email },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error verifying account.')
    throw new Error('verify')
  }

  const id = res.id
  try {
    await db.account_Confirmation.delete({
      where: { id },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error deleting signup confirmation.')
    throw new Error('delete')
  }

  return true
}
//
