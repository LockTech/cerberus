import { validate as isUUID } from 'uuid'
import { ValidationError } from '@redwoodjs/graphql-server'

import { KetoBuildOrgMemberTuple } from 'src/constants/keto'

import { checkTuple } from 'src/helpers/keto'

import { getContextUser } from 'src/lib/context'
import { db } from 'src/lib/db'

import { isBool, isStr } from 'src/util/asserters'

import type {
  DisabledInput,
  EmailInput,
  IDInput,
  NameInput,
} from 'types/inputs'

export const AccountNameMaxLength = 70

export const AccountEmailMaxLength = 254

export const AccountEmailValidRegEx =
  /^[\w-]+(?:\.[\w-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/g

/**
 * @throws
 *  * 'account-disabled-invalid' - When `disabled` is not a boolean.
 */
export const validateAccountDisabled = ({ disabled }: DisabledInput) => {
  if (!isBool(disabled)) throw new ValidationError('account-disabled-invalid')
}

/**
 * @throws
 *  * 'account-email-invalid' - When `email` is not a string.
 *  * 'account-email-length' - When `email` is less than 1 or greater than `AccountEmailMaxLength` characters long.
 *  * 'account-email-reserved' - When `email` contains a reserved character.
 *  * 'account-email-unique' - When `email` is in use by another account.
 */
export const validateAccountEmail = async ({ email }: EmailInput) => {
  if (!isStr(email)) throw new ValidationError('account-email-invalid')

  if (email.length <= 0 || email.length > AccountEmailMaxLength)
    throw new ValidationError('account-email-length')

  if (email.match(AccountEmailValidRegEx) === null)
    throw new ValidationError('account-email-reserved')

  const res = await db.account.findUnique({ where: { email } })
  if (res !== null) throw new ValidationError('account-email-unique')
}

/**
 * @throws
 *  * 'account-id-invalid' - When `id` is not a valid UUID.
 *  * 'account-id-forbidden' - When `id` is not accessibile by the invoking account.
 */
export const validateAccountID = async ({ id }: IDInput) => {
  if (!isUUID(id)) throw new ValidationError('account-id-invalid')

  const organizationId = getContextUser().organizationId

  const tuple = KetoBuildOrgMemberTuple(id, organizationId)

  const res = await checkTuple(tuple)

  if (!res) throw new ValidationError('account-id-forbidden')
}

/**
 * @throws
 *  * 'account-name-invalid' - When `name` is not a string.
 *  * 'account-name-length' - When `name` is less than 1 or greater than `AccountNameMaxLength` characters long.
 */
export const validateAccountName = ({ name }: NameInput) => {
  if (!isStr(name)) throw new ValidationError('account-name-invalid')

  if (name.length <= 0 || name.length > AccountNameMaxLength)
    throw new ValidationError('account-name-length')
}
