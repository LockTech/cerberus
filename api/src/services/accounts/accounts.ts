import type { Account } from '@prisma/client'
import { UserInputError } from '@redwoodjs/graphql-server'
import type { BeforeResolverSpecType } from '@redwoodjs/graphql-server'

import { sendInviteEmail } from 'src/helpers/email'

import { getContextUser } from 'src/lib/context'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { createInviteConfirm } from 'src/services/account_confirmations'
import { organization as getOrganization } from 'src/services/organizations'

import { randomStr } from 'src/util/randomStr'

import {
  validateCurrentUser,
  validateAccountId,
  validateAccountName,
  validateAccountOrganization,
} from 'src/validators/account'
import { validateEmail } from 'src/validators/email'

//
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(validateCurrentUser)
  rules.add(validateAccountOrganization)
  rules.add(validateAccountId, { only: ['currentAccount'] })
  rules.add((s, { name }) => name && validateAccountName(s, { name }), {
    only: ['updateAccount'],
  })
  rules.add(
    (s, _i) => validateAccountName(s, { name: getContextUser().name }),
    { only: ['inviteAccount'] }
  )
  rules.add((s, { email }) => email && validateEmail(s, { email }), {
    only: ['updateAccount'],
  })
  rules.add(validateEmail, { only: ['inviteAccount'] })
}
//

// == Helpers
export const removeAuthFields = (acc: Account) => {
  if (acc) {
    delete acc.hashedPassword
    delete acc.salt
  }
  return acc
}

const checkOrgsMatch = async (searchId: string, invokerId: string) => {
  const updateOrg = await db.account.findUnique({
    select: { organizationId: true },
    where: { id: searchId },
  })
  const updateOrganizationId = updateOrg.organizationId
  if (updateOrganizationId !== invokerId) {
    throw new UserInputError('account-organization-match')
  }
}
//

// == C
/**
 * @throws
 *  * 'account-create-confirm' - When an error occurs creating the invitation.
 *  * 'account-email-send' - When an error occurs sending the invitation email.
 */
export const inviteAccount = async ({ email }) => {
  await checkEmailExist({ email })

  const organization = await getOrganization()
  const organizationId = organization.id
  const organizationName = organization.name

  const name = getContextUser().name

  const code = randomStr(36)

  try {
    await createInviteConfirm({ code, email, organizationId })
  } catch (err) {
    logger.error({ err }, 'Error creating invitation confirmation.')
    throw new UserInputError('account-create-confirm')
  }

  const data = {
    code,
    name,
    organizationName,
  }
  try {
    await sendInviteEmail({ data, email })
  } catch (err) {
    logger.error({ err }, 'Error sending invitation email.')
    throw new UserInputError('account-email-send')
  }

  return true
}
//

// == R
/**
 * @throws
 *  * 'account-get' - When an error occurs retrieving an account from the DB.
 */
export const account = async ({ id }: { id: string }) => {
  const organizationId = getContextUser().organizationId

  let res: Account

  try {
    res = await db.account.findFirst({
      where: {
        id,
        organizationId,
      },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error getting an account.')
    throw new UserInputError('account-get')
  }

  res = removeAuthFields(res)

  return res
}

/**
 * @throws
 *  * 'account-get' - When an error occurs retrieving accounts from the DB.
 */
export const accounts = async () => {
  const organizationId = getContextUser().organizationId

  let res: Account[]

  try {
    res = await db.account.findMany({
      where: { organizationId },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error getting accounts.')
    throw new UserInputError('account-get')
  }

  res = res.map((acc) => removeAuthFields(acc))

  return res
}

interface CheckEmailExistArgs {
  email: string
}
/**
 * @throws
 *  * 'account-email-taken' - When the email provided is already in use.
 */
const checkEmailExist = async ({ email }: CheckEmailExistArgs) => {
  const res = await db.account.count({ where: { email } })

  if (res !== 0) {
    throw new UserInputError('account-email-taken')
  }
}

/**
 * @throws
 *  * 'account-get' - When an error occurs retrieving an account from the DB.
 */
export const currentAccount = async () => {
  const id = getContextUser().id

  let res: Account

  try {
    res = await db.account.findUnique({
      where: { id },
      include: { organization: true },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error getting currentAccount.')
    throw new UserInputError('account-get')
  }

  res = removeAuthFields(res)

  return res
}
//

// == U
export interface UpdateAccountArgs {
  id: string
  email: string
  name: string
}
/**
 * @throws
 *  * 'account-organization-match' - When the organization the account belongs to does not match the current user's.
 *  * 'account-update' - When an error occures updating the Account in the DB.
 */
export const updateAccount = async ({ email, id, name }: UpdateAccountArgs) => {
  email && (await checkEmailExist({ email }))

  await checkOrgsMatch(id, getContextUser().organizationId)

  let res: Account

  try {
    res = await db.account.update({
      data: { email, name },
      where: { id },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error updating account.')
    throw new UserInputError('account-update')
  }

  res = removeAuthFields(res)

  return res
}
//

// == D
export interface DeleteAccountArgs {
  id: string
}
/**
 * @throws
 *  * 'account-organization-match' - When the organization the account belongs to does not match the current user's.
 *  * 'account-delete' - When an error occures deleting the Account from the DB.
 */
export const deleteAccount = async ({ id }: DeleteAccountArgs) => {
  await checkOrgsMatch(id, getContextUser().organizationId)

  let res: Account

  // remove account roles

  try {
    res = await db.account.delete({
      where: { id },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error deleting account.')
    throw new UserInputError('account-delete')
  }

  res = removeAuthFields(res)

  return res
}
//
