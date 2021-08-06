import { ValidationError } from '@redwoodjs/graphql-server'

/**
 * Throws a 'rejected' error, nothing more.
 */
export const reject = () => {
  throw new ValidationError('rejected')
}
