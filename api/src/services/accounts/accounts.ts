import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { requireCurrentUser } from 'src/lib/auth'
import { getCurrentUser } from 'src/lib/currentUser'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { isStr } from 'src/util/asserters'
import { randomStr } from 'src/util/randomStr'

// ==
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireCurrentUser)
  rules.skip([requireCurrentUser], { only: ['signupAccount'] })
}
//

// ==
export interface SignupAccountArgs {
  email: string
}
export const signupAccount = async ({ email }: SignupAccountArgs) => {
  if (!isStr(email)) {
    logger.warn('Did not recieve a valid email for signupAccount.')
    throw new SyntaxError('Cannot signup an account without an email address.')
  }

  const code = randomStr(6)

  db.account_Confirmation.create({
    data: {
      code,
      email,
    },
  })

  return true
}

export interface InviteMemberArgs {
  email: string
}
export const inviteMember = async ({ email }: InviteMemberArgs) => {
  const organizationId = getCurrentUser().organizationId

  if (!isStr(email)) {
    logger.warn('Did not recieve a valid email for inviteMember.')
    throw new SyntaxError('Cannot invite an account without an email address.')
  }

  const code = randomStr(6)

  db.account_Confirmation.create({
    data: {
      code,
      email,
      organizationId,
    },
  })

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
