import type { Account } from '@prisma/client'
import type { BeforeResolverSpecType } from '@redwoodjs/api'

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
  rules.add(validateAccountId, {
    only: ['currentAccount'],
  })
  rules.add(validateAccountOrganization, {
    only: ['inviteMember', 'account', 'accounts'],
  })
  rules.add(validateAccountName, {
    only: ['inviteMember'],
  })
  rules.add(validateEmail, { only: ['inviteMember'] })
}
//

// == Helpers
const removeAuthFields = (acc: Account) => {
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
 *  * 'email-taken' - When the email provided is already in use.
 *  * 'create-confirm' - When an error occurs creating the invitation.
 *  * 'email-send' - When an error occurs sending the invitation email.
 */
export const inviteMember = async ({ email }) => {
  if (await checkEmailExist({ email })) {
    throw new SyntaxError('email-taken')
  }

  const organization = await getOrganization()
  const organizationId = organization.id
  const organizationName = organization.name

  const currentUser = getContextUser()
  const name = `${currentUser.firstName} ${currentUser.lastName}`

  const code = randomStr(36)

  try {
    await createInviteConfirm({ code, email, organizationId })
  } catch (err) {
    throw new Error('create-confirm')
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
    throw new Error('email-send')
  }

  return true
}
//

// == R
/**
 * @throws
 *  * 'get' - When an error occurs retrieving an account from the DB.
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
    throw new Error('get')
  }

  res = removeAuthFields(res)

  return res
}

/**
 * @throws
 *  * 'get' - When an error occurs retrieving accounts from the DB.
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
    throw new Error('get')
  }

  res = res.map((acc) => removeAuthFields(acc))

  return res
}

interface CheckEmailExistArgs {
  email: string
}
const checkEmailExist = async ({ email }: CheckEmailExistArgs) => {
  const res = await db.account.count({ where: { email } })

  return res !== 0
}

/**
 * @throws
 *  * 'get' - When an error occurs retrieving an account from the DB.
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
    throw new Error('get')
  }

  res = removeAuthFields(res)

  return res
}
//

// == U
//

// == D
//
