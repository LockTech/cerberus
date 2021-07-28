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
  await db.account_Confirmation.create({
    data: {
      code,
      email,
      organizationId,
      created_at: new Date().toISOString(), // ensure it's the application's time
    },
  })

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
  await db.account_Confirmation.create({
    data: {
      code,
      email,
      created_at: new Date().toISOString(),
    },
  })

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
