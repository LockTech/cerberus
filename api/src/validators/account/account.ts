import { validate as isUUID } from 'uuid'
import { ValidationError } from '@redwoodjs/api'

import {
  AccountEmailMaxLength,
  AccountNameMaxLength,
  AccountEmailValidRegEx,
} from 'src/constants/account'

import { isBool, isStr } from 'src/util/asserters'

import type {
  DisabledInput,
  EmailInput,
  IDInput,
  NameInput,
} from 'types/inputs'

/**
 * @throws
 *  * 'account-disabled-invalid' - When `disabled` is not a boolean.
 */
export const validateAccountDisabled = (
  s: string,
  { disabled }: DisabledInput
) => {
  if (!isBool(disabled)) throw new ValidationError('account-disabled-invalid')
}

/**
 * @throws
 *  * 'account-email-invalid' - When `email` is not a string.
 *  * 'account-email-length' - When `email` is less than 1 or greater than `AccountEmailMaxLength` characters long.
 *  * 'account-email-reserved' - When `email` contains a reserved character.
 */
export const validateAccountEmail = (s: string, { email }: EmailInput) => {
  if (!isStr(email)) throw new ValidationError('account-email-invalid')

  if (email.length <= 0 || email.length > AccountEmailMaxLength)
    throw new ValidationError('account-email-length')

  if (email.match(AccountEmailValidRegEx) === null)
    throw new ValidationError('account-email-reserved')

  // perform DB check for email's existence; use case insensitive
}

/**
 * @throws
 *  * 'account-id-invalid' - When `id` is not a valid UUID.
 */
export const validateAccountID = (s: string, { id }: IDInput) => {
  if (!isUUID(id)) throw new ValidationError('account-id-invalid')

  // use keto to check id is a member of the invoker's organization
}

/**
 * @throws
 *  * 'account-name-invalid' - When `name` is not a string.
 *  * 'account-name-length' - When `name` is less than 1 or greater than `AccountNameMaxLength` characters long.
 */
export const validateAccountName = (s: string, { name }: NameInput) => {
  if (!isStr(name)) throw new ValidationError('account-name-invalid')

  if (name.length <= 0 || name.length > AccountNameMaxLength)
    throw new ValidationError('account-name-length')
}
