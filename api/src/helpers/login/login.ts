import type { Account } from '@prisma/client'
import { setContext } from '@redwoodjs/api'

import { validateAuthDisabled, validateAuthVerified } from 'src/validators/auth'

export const loginHandler = async (currentUser: Account) => {
  setContext({ currentUser })

  validateAuthVerified('loginHandler')
  validateAuthDisabled('loginHandler')

  // MFA?

  return currentUser
}
