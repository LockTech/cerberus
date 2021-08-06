import { ValidationError } from '@redwoodjs/api'

import { isStr } from 'src/util/asserters'

export const ValidEmailRegEx =
  /^[\w-]+(?:\.[\w-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/g

interface EmailInput {
  email: string
}

export const validateEmail = (_name: string, { email }: EmailInput) => {
  if (email === undefined || email === null) {
    throw new ValidationError('email-required')
  }

  if (!isStr(email) || email === '') {
    throw new ValidationError('email-invalid')
  }

  if (email.length > 254) {
    throw new ValidationError('email-length')
  }

  if (email.match(ValidEmailRegEx) === null) {
    throw new ValidationError('email-reserved')
  }
}
