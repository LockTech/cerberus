import type { Account_Confirmation } from '@prisma/client'
import { UserInputError } from '@redwoodjs/graphql-server'
import type { BeforeResolverSpecType } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { reject } from 'src/validators/rejector'

//
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(reject, { except: ['confirmSignup'] })
  rules.skip({ only: ['confirmSignup'] })
}
//

// == C
export interface CreateInviteConfirmArgs {
  code: string
  email: string
  organizationId: string
}
/**
 * @throws
 *  * 'account-confirmation-create' - When there is an error creating the AccountConfirmation in the DB.
 */
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
      },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error creating invitation confirmation.')
    throw new UserInputError('account-confirmation-create')
  }

  return true
}

export interface CreateSignupConfirmArgs {
  code: string
  email: string
}
/**
 * @throws
 *  * 'account-confirmation-create' - When there is an error creating the AccountConfirmation in the DB.
 */
export const createSignupConfirm = async ({
  code,
  email,
}: CreateSignupConfirmArgs) => {
  try {
    await db.account_Confirmation.create({
      data: {
        code,
        email,
      },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error creating signup confirmation.')
    throw new UserInputError('account-confirmation-create')
  }

  return true
}
//

// == R
export interface ConfirmInvitationArgs {
  code: string
  email: string
}
/**
 * Determines if a given `code` and `email` combination are valid for an `invitation` to an organization.
 *
 * If the combination are valid, the record in the DB will be deleted.
 *
 * @returns
 *  * `false` if the combination are **not** valid.
 *  * `true` if the combination is valid.
 * @throws
 *  * 'account-confirmation-get' - When there is an error retrieving the Account_Confirmation from the DB.
 *  * 'account-confirmation-delete' - When there is an error deleting the Account_Confirmation from the DB.
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
    throw new UserInputError('account-confirmation-get')
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
    throw new Error('account-confirmation-delete')
  }

  return true
}

export interface ConfirmSignupArgs {
  code: string
  email: string
}
/**
 * Determines if a given `code` and `email` combination are valid for a new account `signup`.
 *
 * If the combination are valid, the record in the DB will be deleted and the account
 * which was confirmed will be `verified`.
 *
 * @returns
 *  * `false` if the combination are **not** valid.
 *  * `true` if the combination is valid.
 * @throws
 *  * 'account-confirmation-get' - When there is an error retrieving the Account_Confirmation from the DB.
 *  * 'account-confirmation-update' - When there is an error updating the confirmed account in the DB.
 *  * 'account-confirmation-delete' - When there is an error deleting the Account_Confirmation from the DB.
 */
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
    throw new UserInputError('account-confirmation-get')
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
    throw new UserInputError('account-confirmation-update')
  }

  const id = res.id
  try {
    await db.account_Confirmation.delete({
      where: { id },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error deleting signup confirmation.')
    throw new UserInputError('account-confirmation-delete')
  }

  return true
}
//
