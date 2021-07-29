import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'

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
  await db.account_Confirmation.create({
    data: {
      code,
      email,
      organizationId,
      createdAt: new Date().toISOString(),
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
      createdAt: new Date().toISOString(),
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
      createdAt: 'desc',
    },
    where: {
      code,
      email,
    },
  })

  if (res === null) return false

  if (res.organizationId === null) return false

  const id = res.id
  await db.account_Confirmation.delete({
    where: { id },
  })

  return true
}

export interface ConfirmSignupArgs {
  code: string
  email: string
}
export const confirmSignup = async ({ code, email }: ConfirmSignupArgs) => {
  const res = await db.account_Confirmation.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      code,
      email,
    },
  })

  if (res === null) return false

  if (res.organizationId !== null) return false

  await db.account.update({
    data: { verified: true, verifiedAt: new Date().toISOString() },
    where: { email },
  })

  const id = res.id
  await db.account_Confirmation.delete({
    where: { id },
  })

  return true
}
//
