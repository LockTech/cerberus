import type { APIGatewayEvent } from 'aws-lambda'
import { ValidationError } from '@redwoodjs/graphql-server'

import { isDefined, isStr } from 'src/util/asserters'

const JSONHeaderKey = 'content-type'
const JSONHeader = 'application/json'

/**
 * @throws
 *  * 'function-invalid-body' - When `body` is defined and not a valid string.
 *  * 'function-invalid-mediatype' - When `headers.Content-Type` is not `JSONHeader` ('application/json').
 */
export const validateJSON = (
  _service: string,
  { body, headers }: APIGatewayEvent
) => {
  if (isDefined(body) && !isStr(body)) {
    throw new ValidationError('function-invalid-body')
  }

  const contentType = headers[JSONHeaderKey]

  if (isDefined(contentType) && contentType !== JSONHeader) {
    throw new ValidationError('function-invalid-mediatype')
  }
}

/**
 * @throws
 *  * 'function-method-invalid' - When `httpMethod` is not 'POST', 'GET', 'DELETE', or 'PUT'
 */
export const validateMethod = (
  _service: string,
  { httpMethod }: APIGatewayEvent
) => {
  if (
    httpMethod !== 'POST' &&
    httpMethod !== 'GET' &&
    httpMethod !== 'DELETE' &&
    httpMethod !== 'PUT'
  ) {
    throw new ValidationError('function-method-invalid')
  }
}
