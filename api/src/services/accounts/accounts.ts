import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { sendInviteEmail } from 'src/helpers/email'

import { getContextUser } from 'src/lib/context'
import { db } from 'src/lib/db'

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

// == C
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

  await createInviteConfirm({ code, email, organizationId })

  const data = {
    code,
    name,
    organizationName,
  }
  await sendInviteEmail({ data, email })

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

interface CheckEmailExistArgs {
  email: string
}
const checkEmailExist = async ({ email }: CheckEmailExistArgs) => {
  const res = await db.account.count({ where: { email } })

  return res >= 1 || false
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
