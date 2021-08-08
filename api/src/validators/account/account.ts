import { ValidationError } from '@redwoodjs/api'

import {
  AccountNameMaxLength,
  AccountEmailValidRegEx,
} from 'src/constants/account'
import { logger } from 'src/lib/logger'
import { isStr } from 'src/util/asserters'

interface EmailInput {
  email: string
}
/**
 * @throws
 *  * 'email-invalid' - When `email` is not a string.
 *  * 'email-length' - When `email` is less than 1 or greater than `AccountEmailMaxLength` characters long.
 *  * 'email-reserved' - When `email` contains a reserved character.
 */
export const validateAccountEmail = (
  service: string,
  { email }: EmailInput
) => {
  if (!isStr(email)) {
    logger.error({ service }, 'Error validating account email.')
    throw new ValidationError('account-email-invalid')
  }

  if (email.length <= 0 || email.length > AccountNameMaxLength) {
    logger.error({ service }, 'Error validating account email.')
    throw new ValidationError('account-email-length')
  }

  if (email.match(AccountEmailValidRegEx) === null) {
    logger.error({ service }, 'Error validating account email.')
    throw new ValidationError('account-email-reserved')
  }
}
