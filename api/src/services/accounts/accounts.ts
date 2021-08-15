import type { Account } from '@prisma/client'
import { UserInputError } from '@redwoodjs/graphql-server'
import type { BeforeResolverSpecType } from '@redwoodjs/graphql-server'

import { AccountRemoveAuthFields } from 'src/constants/account'
import {
  KetoBuildAccountRoleTuple,
  KetoBuildOrgMemberTuple,
} from 'src/constants/keto'

import { sendInviteEmail } from 'src/helpers/email'
import { deleteTuple } from 'src/helpers/keto'

import { getContextUser } from 'src/lib/context'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { createInviteConfirm } from 'src/services/account_confirmations'
import { organization as getOrganization } from 'src/services/organizations'

import { randomStr } from 'src/util/randomStr'

import { validateAuth } from 'src/validators/auth'
import {
  validateAccountEmail,
  validateAccountID,
  validateAccountName,
} from 'src/validators/account'
import { reject } from 'src/validators/reject'

/* eslint-disable prettier/prettier */
const valUpdateEmail = (s: string, { email }) => email && validateAccountEmail(s, { email })
const valUpdateName = (s: string, { name }) => name && validateAccountName(s, { name })

export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(reject, { only: ['deleteAllAccounts'] })
  rules.add(validateAuth)
  rules.add(validateAccountEmail, { only: ['inviteAccount'] })
  rules.add(validateAccountID, { only: ['account', 'updateAccount', 'deleteAccount'] })
  rules.add([valUpdateEmail, valUpdateName], { only: ['updateAccount'] })
}
/* eslint-enable prettier/prettier */

/**
 * @throws
 *  * 'account-email-send' - When an error occurs sending the invitation email.
 */
export const inviteAccount = async ({ email }) => {
  const organization = await getOrganization()
  const organizationId = organization.id
  const organizationName = organization.name
  const name = getContextUser().name
  const code = randomStr(36)

  const confirm = await createInviteConfirm({ code, email, organizationId })

  try {
    const data = {
      code,
      name,
      organizationName,
    }
    await sendInviteEmail({ data, email })
  } catch (err) {
    logger.error({ err }, 'Error sending invitation email.')

    await db.account_Confirmation.delete({ where: { id: confirm.id } })

    throw new UserInputError('account-email-send')
  }

  return true
}

/**
 * @throws
 *  * 'account-read' - When an error occurs retrieving an account from the DB.
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
    throw new UserInputError('account-read')
  }

  res = AccountRemoveAuthFields(res)

  return res
}

/**
 * @throws
 *  * 'account-read' - When an error occurs retrieving accounts from the DB.
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
    throw new UserInputError('account-read')
  }

  res = res.map((acc) => AccountRemoveAuthFields(acc))

  return res
}

export interface UpdateAccountArgs {
  id: string
  email?: string
  name?: string
}
/**
 * @throws
 *  * 'account-update' - When an error occures updating the Account in the DB.
 */
export const updateAccount = async ({ email, id, name }: UpdateAccountArgs) => {
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

  res = AccountRemoveAuthFields(res)

  return res
}

export interface DeleteAccountArgs {
  id: string
}
/**
 * @throws
 *  * 'account-delete-self' - When `context.currentUser.id === id`; preventing the self-deletion of the invokers account.
 *  * 'account-delete' - When an error occures deleting the Account from the DB.
 */
export const deleteAccount = async ({ id }: DeleteAccountArgs) => {
  const currentUser = getContextUser()
  const currentId = currentUser.id

  if (currentId === id) {
    throw new UserInputError('account-delete-self')
  }

  const organizationId = currentUser.organizationId

  const tuple = KetoBuildOrgMemberTuple(id, organizationId)
  await deleteTuple(tuple)

  const account = await db.account.findUnique({
    select: {
      roles: true,
    },
    where: { id },
  })

  account.roles.forEach(
    async (role) => await deleteTuple(KetoBuildAccountRoleTuple(id, role.id))
  )

  let res: Account

  try {
    res = await db.account.delete({
      where: { id },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error deleting account.')
    throw new UserInputError('account-delete')
  }

  res = AccountRemoveAuthFields(res)

  return res
}

export const deleteAllAccounts = async () => {
  const organizationId = getContextUser().organizationId

  const accounts = await db.account.findMany({
    select: {
      id: true,
      roles: true,
    },
    where: { organizationId },
  })

  accounts.forEach(async (account) => {
    const tuple = KetoBuildOrgMemberTuple(account.id, organizationId)
    await deleteTuple(tuple)

    account.roles.forEach(async (role) =>
      deleteTuple(KetoBuildAccountRoleTuple(account.id, role.id))
    )
  })

  try {
    await db.account.deleteMany({ where: { organizationId } })
  } catch (err) {
    logger.error({ err }, 'Prisma error deleting all accounts.')
    throw new UserInputError('delete-users')
  }

  return true
}
