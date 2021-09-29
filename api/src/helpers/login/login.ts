import type { Account } from '@prisma/client'
import { ValidationError } from '@redwoodjs/graphql-server'

import { loginExpires } from 'src/constants/auth'

import { expire, set } from 'src/lib/redis'

export const loginHandler = async (user: Account) => {
  const { disabled, verified } = user

  if (!verified) throw new ValidationError('auth-verified')
  if (disabled) throw new ValidationError('auth-disabled')

  // MFA?

  const redisKey = `cerberus:${user.id}`
  await set(redisKey, JSON.stringify(user))
  await expire(redisKey, loginExpires)

  return user
}
