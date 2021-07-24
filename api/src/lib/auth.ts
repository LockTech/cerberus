import { AuthenticationError } from '@redwoodjs/api'

import { db } from './db'

export const getCurrentUser = async (session) => {
  return await db.account.findUnique({ where: { id: session.id } })
}

export const requireCurrentUser = () => {
  if (!context.currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }
}
