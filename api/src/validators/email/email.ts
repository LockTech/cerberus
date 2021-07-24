import { ValidationError } from '@redwoodjs/api'
import { logger } from 'src/lib/logger'
import { isStr } from 'src/util/asserters'

export const ValidEmailRegEx =
  /^[\w-]+(?:\.[\w-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/g

interface EmailInput {
  email: string
}

export const validateEmail = (
  name: string,
  { input: { email } }: { input: EmailInput }
) => {
  if (email === undefined || email === null) {
    logger.warn(`[${name}]: Could not validate email exist.`)
    throw new ValidationError('required')
  }

  if (!isStr(email)) {
    logger.warn(`[${name}]: Could not validate email was a string.`)
    throw new ValidationError('invalid')
  }

  if (email.length > 254) {
    logger.warn(`[${name}]: Email exceeds maximum length.`)
    throw new ValidationError('length')
  }

  if (email.match(ValidEmailRegEx) === null) {
    logger.warn(`[${name}]: Email contains invalid character.`)
    throw new ValidationError('reserved')
  }
}
