import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { requireCurrentUser } from 'src/lib/auth'
import { getCurrentUser } from 'src/lib/currentUser'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { randomStr } from 'src/util/randomStr'

import { validateEmail } from 'src/validators/email'

// ==
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireCurrentUser)
  rules.add(validateEmail, { only: ['inviteMember', 'signupAccount'] })
  rules.skip([requireCurrentUser], { only: ['signupAccount'] })
}
//

// ==
const checkEmailTaken = async (service: string, email: string) => {
  const accountExist = await db.account.count({ where: { email } })
  if (accountExist !== 0) {
    logger.warn(`[${service}]: Attempted to use taken email.`)
    throw new SyntaxError('taken')
  }
}

export interface SignupAccountArgs {
  email: string
}
export const signupAccount = async ({ email }: SignupAccountArgs) => {
  await checkEmailTaken('signupAccount', email)

  const code = randomStr(6)

  await db.account_Confirmation.create({
    data: {
      code,
      email,
    },
  })

  // send confirmation email

  return true
}

export interface InviteMemberArgs {
  email: string
}
export const inviteMember = async ({ email }: InviteMemberArgs) => {
  await checkEmailTaken('inviteMember', email)

  const organizationId = getCurrentUser().organizationId
  const code = randomStr(6)

  await db.account_Confirmation.create({
    data: {
      code,
      email,
      organizationId,
    },
  })

  // send confirmation email

  return true
}
//

// ==
export const account = async ({ id }: { id: string }) => {
  const res = await db.account.findUnique({
    where: { id },
  })

  return res
}

export const accounts = () => {
  return db.account.findMany()
}

export const currentAccount = () => {
  return getCurrentUser()
}
//
