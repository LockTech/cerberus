import { ValidationError } from '@redwoodjs/api'
import { logger } from 'src/lib/logger'
import { isStr } from 'src/util/asserters'

export const ValidEmailRegEx =
  /^[A-Za-z0-9_+-]+(?:.[A-Za-z0-9_+-]+)*@[A-Za-z0-9-]+(?:.[A-Za-z0-9-]+)*$/g

interface EmailInput {
  email: string
}

export const validateEmail = (
  name: string,
  { input: { email } }: { input: EmailInput }
) => {
  if (!isStr(email)) {
    logger.warn(`[${name}]: Could not validate email exist.`)
    throw new ValidationError('An email is required.')
  }

  if (email.match(ValidEmailRegEx) !== null) {
    logger.warn(`[${name}]: Email contains invalid character.`)
    throw new ValidationError('Email contains invalid character.')
  }
}
