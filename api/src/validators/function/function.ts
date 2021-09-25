import { ValidationError } from '@redwoodjs/graphql-server'

import { FunctionDefaultHeaders } from 'src/constants/function'

import { isDefined, isStr } from 'src/util/asserters'

/**
 * @throws
 *  * 'function-body-invalid' - When `body` is defined and not a string.
 *  * 'function-mediatype-invalid' - When `headers[FunctionHeaderKey]` is defined and not `FunctionHeader` ('application/json').
 */
export const validateJSONBody = (_s: string, { body, headers }) => {
  if (isDefined(body) && !isStr(body))
    throw new ValidationError('function-body-invalid')

  const contentType = headers['content-type']

  if (
    !isDefined(contentType) ||
    contentType !== FunctionDefaultHeaders['content-type']
  )
    throw new ValidationError('function-mediatype-invalid')
}

/**
 * @throws
 *  * 'function-method-invalid' - When `httpMethod` is not - 'DELETE', 'GET', 'POST', or 'PUT'
 */
export const validateHTTPMethod = (_s: string, { httpMethod }) => {
  if (
    httpMethod !== 'DELETE' &&
    httpMethod !== 'GET' &&
    httpMethod !== 'POST' &&
    httpMethod !== 'PUT'
  )
    throw new ValidationError('function-method-invalid')
}
