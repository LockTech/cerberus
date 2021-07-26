import type { Account } from '@prisma/client'
import { context } from '@redwoodjs/api'

export const getContextUser = () => {
  return context.currentUser as Account
}
