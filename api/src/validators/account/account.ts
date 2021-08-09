import { validate as validateUUID } from 'uuid'
import { ValidationError } from '@redwoodjs/api'

import {
  AccountEmailMaxLength,
  AccountNameMaxLength,
  AccountEmailValidRegEx,
} from 'src/constants/account'

import { isStr } from 'src/util/asserters'

interface EmailInput {
  email: string
}
/**
 * @throws
 *  * 'account-email-invalid' - When `email` is not a string.
 *  * 'account-email-length' - When `email` is less than 1 or greater than `AccountEmailMaxLength` characters long.
 *  * 'account-email-reserved' - When `email` contains a reserved character.
 *  * 'account-email-taken' - When `email` is in use by another account.
 */
export const validateAccountEmail = (
  service: string,
  { email }: EmailInput
) => {
  if (!isStr(email)) throw new ValidationError('account-email-invalid')

  if (email.length <= 0 || email.length > AccountEmailMaxLength)
    throw new ValidationError('account-email-length')

  if (email.match(AccountEmailValidRegEx) === null)
    throw new ValidationError('account-email-reserved')

  // perform DB check for email's existing use
}

interface IDInput {
  id: string
}
/**
 * @throws
 *  * 'account-id-invalid' - When `id` is not a valid UUID.
 *  * 'account-id-match' - When `id` does not belong to the same organization as `context.currentUser.id`
 */
export const validateAccountID = (service: string, { id }: IDInput) => {
  if (!isStr(id) || !validateUUID(id))
    throw new ValidationError('account-id-invalid')

  // use DB to validate context.currentUser.id has access to id
}

interface NameInput {
  name: string
}
/**
 * @throws
 *  * 'account-name-invalid' - When `name` is not a string.
 *  * 'account-name-length' - When `name` is less than 1 or greater than `AccountNameMaxLength` characters long.
 */
export const validateAccountName = (service: string, { name }: NameInput) => {
  if (!isStr(name)) throw new ValidationError('account-name-invalid')

  if (name.length <= 0 || name.length > AccountNameMaxLength)
    throw new ValidationError('account-name-length')
}
