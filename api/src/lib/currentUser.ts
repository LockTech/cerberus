import type { Account } from '@prisma/client'
import { context } from '@redwoodjs/api'

export const getCurrentUser = () => {
  return context.currentUser as Account
}
