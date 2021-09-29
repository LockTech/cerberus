import type { Account_Confirmation } from '@prisma/client'
import { UserInputError } from '@redwoodjs/graphql-server'

import { sendSignupEmail } from 'src/helpers/email'

import { db } from 'src/lib/db'
import { logger, prismaLogger } from 'src/lib/logger'

import { randomStr } from 'src/util/randomStr'

export const ConfirmationCodeLength = 8

export interface CreateInviteConfirmArgs {
  code: string
  email: string
  organizationId: string
}
/**
 * @throws
 *  * 'invite-confirmation-create' - When there is an error creating the AccountConfirmation in the DB.
 */
export const createInviteConfirm = async ({
  code,
  email,
  organizationId,
}: CreateInviteConfirmArgs) => {
  let res: Account_Confirmation

  try {
    res = await db.account_Confirmation.create({
      data: {
        code,
        email,
        organizationId,
      },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error creating invitation confirmation.')
    throw new UserInputError('invite-confirmation-create')
  }

  return res
}

export interface CreateSignupConfirmArgs {
  email: string
}
/**
 * @throws
 *  * 'signup-confirmation-create' - When there is an error creating the AccountConfirmation in the DB.
 */
export const createSignupConfirm = async ({
  email,
}: CreateSignupConfirmArgs) => {
  let res: Account_Confirmation

  const code = randomStr(ConfirmationCodeLength)

  // email
  try {
    const data = {
      code,
    }
    await sendSignupEmail({ data, email })
  } catch (err) {
    logger.error({ err }, 'Error sending signup confirmation email.')
    throw new UserInputError('signup-email-send')
  }

  try {
    res = await db.account_Confirmation.create({
      data: {
        code,
        email,
      },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error creating signup confirmation.')
    throw new UserInputError('signup-confirmation-create')
  }

  return res
}

export interface ConfirmInvitationArgs {
  code: string
  email: string
}
/**
 * @throws
 *  * 'invite-confirmation-delete' - When there is an error deleting the Account_Confirmation from the DB.
 *  * 'invite-confirmation-read' - When there is an error retrieving the Account_Confirmation from the DB.
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
        AND: {
          code,
          email,
        },
      },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error getting invitation confirmation.')
    throw new UserInputError('invite-confirmation-read')
  }

  if (res === null) return null

  if (res.organizationId === null) return null

  const id = res.id
  try {
    await db.account_Confirmation.delete({
      where: { id },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Eerror deleting invitation confirmation.')
    throw new Error('invite-confirmation-delete')
  }

  return res
}

export interface ConfirmSignupArgs {
  code: string
  email: string
}
/**
 * @throws
 *  * 'signup-confirmation-delete' - When there is an error deleting the Account_Confirmation from the DB.
 *  * 'signup-confirmation-read' - When there is an error retrieving the Account_Confirmation from the DB.
 *  * 'signup-confirmation-update' - When there is an error updating the confirmed account in the DB.
 */
export const confirmSignup = async ({ code, email }: ConfirmSignupArgs) => {
  let res: Account_Confirmation

  try {
    res = await db.account_Confirmation.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        AND: {
          code,
          email,
        },
      },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error getting signup confirmaton.')
    throw new UserInputError('signup-confirmation-read')
  }

  if (res === null) return false

  if (res.organizationId !== null) return false

  try {
    await db.account.update({
      data: { verified: true, verifiedAt: new Date().toISOString() },
      where: { email },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error verifying account.')
    throw new UserInputError('signup-confirmation-update')
  }

  try {
    const id = res.id

    await db.account_Confirmation.delete({
      where: { id },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error deleting signup confirmation.')
    throw new UserInputError('signup-confirmation-delete')
  }

  return true
}

export interface ResendConfirmationArgs {
  email: string
}
export const resendConfirmation = async ({ email }: ResendConfirmationArgs) => {
  let confirmation: Account_Confirmation

  try {
    confirmation = await db.account_Confirmation.findFirst({ where: { email } })
  } catch (err) {
    prismaLogger.error({ err }, 'Error getting an account confirmation.')
    throw new UserInputError('resend-confirmation-read')
  }

  if (confirmation === null) return

  await createSignupConfirm({ email })

  return
}
