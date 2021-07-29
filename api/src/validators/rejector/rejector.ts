import { AuthenticationError } from '@redwoodjs/api'

/**
 * Throws a 'rejected' `AuthenticationError`. Nothing more.
 */
export const reject = () => {
  throw new AuthenticationError('rejected')
}
