import type { Account, Role } from '@prisma/client'
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
import { logger, prismaLogger } from 'src/lib/logger'

import { createInviteConfirm } from 'src/services/account_confirmations'
import { organization as getOrganization } from 'src/services/organizations'

import { randomStr } from 'src/util/randomStr'

import { validateAuth } from 'src/validators/auth'
import {
  validateAccountDisabled,
  validateAccountEmail,
  validateAccountID,
  validateAccountName,
} from 'src/validators/account'
import { reject } from 'src/validators/reject'

/* eslint-disable prettier/prettier */
const valUpdateDisabled = (s: string, { disabled }) => disabled && validateAccountDisabled(s, { disabled })
const valUpdateEmail = (s: string, { email }) => email && validateAccountEmail(s, { email })
const valUpdateName = (s: string, { name }) => name && validateAccountName(s, { name })

export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(reject, { only: ['deleteAllAccounts'] })
  rules.add(validateAuth)
  rules.add(validateAccountEmail, { only: ['inviteAccount'] })
  rules.add(validateAccountID, { only: ['account', 'updateAccount', 'deleteAccount'] })
  rules.add([valUpdateDisabled, valUpdateEmail, valUpdateName], { only: ['updateAccount'] })
}
/* eslint-enable prettier/prettier */

/**
 * @throws
 *  * 'account-invite-email-send' - When an error occurs sending the invitation email.
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

    throw new UserInputError('account-invite-email-send')
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
      include: { roles: true },
      where: {
        id,
        organizationId,
      },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error getting an account.')
    throw new UserInputError('account-read')
  }

  res = AccountRemoveAuthFields(res)

  return res
}

/**
 * @throws
 *  * 'accounts-read' - When an error occurs retrieving accounts from the DB.
 */
export const accounts = async () => {
  const organizationId = getContextUser().organizationId

  let res: Account[]

  try {
    res = await db.account.findMany({
      include: { roles: true },
      where: { organizationId },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error getting accounts.')
    throw new UserInputError('accounts-read')
  }

  res = res.map((acc) => AccountRemoveAuthFields(acc))

  return res
}

export interface UpdateAccountArgs {
  id: string
  disabled?: boolean
  email?: string
  name?: string
}
/**
 * @throws
 *  * 'account-update' - When an error occures updating the Account in the DB.
 */
/* eslint-disable prettier/prettier */
export const updateAccount = async ({ id, disabled, email, name }: UpdateAccountArgs) => {
  /* eslint-enable prettier/prettier */
  let res: Account

  try {
    res = await db.account.update({
      data: { disabled, email, name },
      where: { id },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error updating account.')
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

  let accRelations: { roles: Role[] }

  try {
    accRelations = await db.account.findUnique({
      select: {
        roles: true,
      },
      where: { id },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error retrieving account-relations.')
    throw new UserInputError('account-delete')
  }

  accRelations.roles.forEach(
    async (role) => await deleteTuple(KetoBuildAccountRoleTuple(id, role.id))
  )

  let res: Account

  try {
    res = await db.account.delete({
      where: { id },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error deleting account.')
    throw new UserInputError('account-delete')
  }

  res = AccountRemoveAuthFields(res)

  return res
}

/**
 * @throws
 *  * 'accounts-delete' - When an error occurs deleting the accounts from the DB.
 */
export const deleteAllAccounts = async () => {
  const organizationId = getContextUser().organizationId

  let accounts: { id: string; roles: Role[] }[]

  try {
    accounts = await db.account.findMany({
      select: {
        id: true,
        roles: true,
      },
      where: { organizationId },
    })
  } catch (err) {
    prismaLogger.error({ err }, 'Error retrieving account-role relations.')
    throw new UserInputError('accounts-delete')
  }

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
    prismaLogger.error({ err }, 'Error deleting all accounts.')
    throw new UserInputError('accounts-delete')
  }

  return true
}
