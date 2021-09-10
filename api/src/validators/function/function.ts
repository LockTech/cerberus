import type { APIGatewayEvent } from 'aws-lambda'
import { ValidationError } from '@redwoodjs/api'

import {
  FunctionHeaderMediaTypeKey,
  FunctionHeaderMediaType,
} from 'src/constants/function'

import { isDefined, isStr } from 'src/util/asserters'

/**
 * @throws
 *  * 'function-body-invalid' - When `body` is defined and not a string.
 *  * 'function-mediatype-invalid' - When `headers[FunctionHeaderKey]` is defined and not `FunctionHeader` ('application/json').
 */
export const validateJSONBody = (
  _s: string,
  { body, headers }: APIGatewayEvent
) => {
  if (isDefined(body) && !isStr(body))
    throw new ValidationError('function-body-invalid')

  const contentType = headers[FunctionHeaderMediaTypeKey]

  if (!isDefined(contentType) || contentType !== FunctionHeaderMediaType)
    throw new ValidationError('function-mediatype-invalid')
}

/**
 * @throws
 *  * 'function-method-invalid' - When `httpMethod` is not - 'DELETE', 'GET', 'POST', or 'PUT'
 */
export const validateHTTPMethod = (
  _s: string,
  { httpMethod }: APIGatewayEvent
) => {
  if (
    httpMethod !== 'DELETE' &&
    httpMethod !== 'GET' &&
    httpMethod !== 'POST' &&
    httpMethod !== 'PUT'
  )
    throw new ValidationError('function-method-invalid')
}
