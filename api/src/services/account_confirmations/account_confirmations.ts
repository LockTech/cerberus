import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'

import { minutes } from 'src/util/time'

import { reject } from 'src/validators/rejector'

//
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(reject)
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
  const res = await db.account_Confirmation.findFirst({
    orderBy: {
      created_at: 'desc',
    },
    where: {
      code,
      email,
    },
  })

  if (res === null) return false

  if (res.organizationId === null) return false

  return res
}

export interface ConfirmSignupArgs {
  code: string
  email: string
}
export const confirmSignup = async ({ code, email }: ConfirmSignupArgs) => {
  const now = new Date()
  const tenMinAgo = new Date(now.valueOf() - minutes(10))

  const res = await db.account_Confirmation.findFirst({
    orderBy: {
      created_at: 'desc',
    },
    where: {
      code,
      created_at: {
        gte: tenMinAgo,
        lt: now,
      },
      email,
    },
  })

  if (res === null) return false

  if (res.organizationId !== null) return false

  return res
}
//
