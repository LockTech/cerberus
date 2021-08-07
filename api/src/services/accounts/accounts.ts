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
  rules.add(validateAccountOrganization, { except: ['currentAccount'] })
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
//

// == C
/**
 * @throws
 *  * 'account-email-taken' - If `email` is already in use by another member.
 *  * 'account-create-confirm' - When an error occurs creating the invitation.
 *  * 'account-email-send' - When an error occurs sending the invitation email.
 */
export const inviteAccount = async ({ email }) => {
  if (await checkAccountExist({ email })) {
    throw new UserInputError('account-email-taken')
  }

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

interface CheckAccountExistArgs {
  id?: string
  email?: string
  organizationId?: string
}
export const checkAccountExist = async ({
  email,
  id,
  organizationId,
}: CheckAccountExistArgs) => {
  const res = await db.account.count({ where: { email, id, organizationId } })

  return res >= 1
}

/**
 * Check that `accountId` is an Account `id` which belongs to the same organization as `invokerOrganizationId`.
 *
 * @param accountId
 * @param invokerOrganizationId
 * @throws
 *  * 'account-organization-match'
 */
export const checkOrgsMatch = async (
  accountId: string,
  invokerOrganizationId: string
) => {
  const updateOrg = await db.account.findUnique({
    select: { organizationId: true },
    where: { id: accountId },
  })
  const searchOrganizationId = updateOrg.organizationId

  return searchOrganizationId === invokerOrganizationId
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
  if (email) {
    if (await checkAccountExist({ email })) {
      throw new UserInputError('account-email-taken')
    }
  }

  if (await checkOrgsMatch(id, getContextUser().organizationId)) {
    throw new UserInputError('account-organization-match')
  }

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
 *  * 'account-delete-self' - When `context.currentUser.id === id`; preventing the deletion of the invokers account.
 *  * 'account-organization-match' - When the organization the account belongs to does not match the current user's.
 *  * 'account-delete' - When an error occures deleting the Account from the DB.
 */
export const deleteAccount = async ({ id }: DeleteAccountArgs) => {
  const currentAccount = getContextUser()
  const currentId = currentAccount.id
  const organizationId = currentAccount.organizationId

  if (currentId === id) {
    throw new UserInputError('account-delete-self')
  }

  await checkOrgsMatch(id, organizationId)

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
