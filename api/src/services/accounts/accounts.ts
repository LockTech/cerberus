import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { getContextUser } from 'src/lib/context'
import { db } from 'src/lib/db'
import { templateFileSendMail } from 'src/lib/email'
import { logger } from 'src/lib/logger'
import type { TemplateData } from 'src/lib/template'

import { organization as getOrganization } from 'src/services/organizations'

import { randomStr } from 'src/util/randomStr'

import {
  validateCurrentUser,
  validateAccountId,
  validateAccountName,
  validateAccountOrganization,
} from 'src/validators/account'
import { validateEmail } from 'src/validators/email'

// ==
const RandomStrLength = 8

const EmailSignupFilePath = 'config/emails/signup.html'
const EmailSignupSubject = process.env.EMAIL_SIGNUP_SUBJECT

const EmailInviteFilePath = 'config/emails/invite.html'
const EmailInviteSubject = process.env.EMAIL_INVITE_SUBJECT
//

//
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(validateCurrentUser, { except: ['signupAccount'] })
  rules.add(validateAccountId, {
    only: ['currentAccount'],
  })
  rules.add(validateAccountOrganization, {
    only: ['inviteMember', 'account', 'accounts'],
  })
  rules.add(validateAccountName, {
    only: ['inviteMember'],
  })
  rules.add(validateEmail, { only: ['inviteMember', 'signupAccount'] })
}
//

// == C
const checkEmailTaken = async (service: string, email: string) => {
  const accountExist = await db.account.count({ where: { email } })
  if (accountExist !== 0) {
    logger.warn(`[${service}]: Attempted to use taken email.`)
    throw new SyntaxError('taken')
  }
}
interface SendConfirmationEmailOptions {
  data: TemplateData
  email: string
  path: string
  subject: string
}
const sendConfirmationEmail = async ({
  data,
  email,
  path,
  subject,
}: SendConfirmationEmailOptions) => {
  await templateFileSendMail({
    data,
    path,
    subject,
    to: email,
  })
}

export interface SignupAccountArgs {
  email: string
}
export const signupAccount = async ({ email }: SignupAccountArgs) => {
  await checkEmailTaken('signupAccount', email)

  const code = randomStr(RandomStrLength)

  await db.account_Confirmation.create({
    data: {
      code,
      email,
      created_at: new Date().toISOString(),
    },
  })

  const data = { code }

  await sendConfirmationEmail({
    data,
    email,
    path: EmailSignupFilePath,
    subject: EmailSignupSubject,
  })

  return true
}

export interface InviteMemberArgs {
  email: string
}
export const inviteMember = async ({ email }: InviteMemberArgs) => {
  await checkEmailTaken('inviteMember', email)

  const organization = await getOrganization()
  const organizationId = organization.id
  const organizationName = organization.name

  const currentUser = getContextUser()
  const name = `${currentUser.firstName} ${currentUser.lastName}`
  const code = randomStr(RandomStrLength)

  await db.account_Confirmation.create({
    data: {
      code,
      email,
      organizationId,
      created_at: new Date().toISOString(),
    },
  })

  const data = {
    code,
    name,
    organizationName,
  }

  await sendConfirmationEmail({
    data,
    email,
    path: EmailInviteFilePath,
    subject: EmailInviteSubject,
  })

  return true
}
//

// == R
export const account = async ({ id }: { id: string }) => {
  const organizationId = getContextUser().organizationId

  const res = await db.account.findFirst({
    where: {
      id,
      organizationId,
    },
  })

  return res
}

export const accounts = async () => {
  const organizationId = getContextUser().organizationId

  const res = await db.account.findMany({
    where: { organizationId },
  })

  return res
}

export const currentAccount = async () => {
  const id = getContextUser().id

  const res = await db.account.findUnique({ where: { id } })

  return res
}
//

// == U
//

// == D
//
