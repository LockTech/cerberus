import { ValidationError } from '@redwoodjs/api'

/**
 * Throws a 'rejected' error, nothing more.
 */
export const reject = () => {
  throw new ValidationError('rejected')
}
