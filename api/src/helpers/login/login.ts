import type { Account } from '@prisma/client'
import { ValidationError } from '@redwoodjs/api'

export const loginHandler = async (user: Account) => {
  const { disabled, verified } = user

  if (!verified) throw new ValidationError('auth-verified')
  if (disabled) throw new ValidationError('auth-disabled')

  // MFA?

  return user
}
