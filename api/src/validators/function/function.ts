import type { APIGatewayEvent } from 'aws-lambda'
import { ValidationError } from '@redwoodjs/graphql-server'

import { isStr } from 'src/util/asserters'

/**
 * @throws
 *  * 'function-body-invalid' - When `body` is not a valid string.
 */
export const validateBodyJSON = (
  _service: string,
  { body }: APIGatewayEvent
) => {
  if (!isStr(body)) {
    throw new ValidationError('function-body-invalid')
  }
}
