import { AuthenticationError } from '@redwoodjs/api'

import { db } from 'src/lib/db'

export const getCurrentUser = async (session) => {
  return await db.account.findUnique({ where: { id: session.id } })
}

export const requireCurrentUser = () => {
  if (!context.currentUser) {
    throw new AuthenticationError('authentication')
  }
}
