import type { Account } from '@prisma/client'
import { context } from '@redwoodjs/api'

/**
 * Retrieve the current request's authenticated `Account`;
 * accepted as the account which initiated the request.
 */
export const getContextUser = () => {
  return context.currentUser as Account
}
