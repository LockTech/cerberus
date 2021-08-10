import type { ProxyResult } from 'aws-lambda'

import { FunctionDefaultHeaders as headers } from 'src/constants/function'

/**
 * Create a `ProxyResult` to be used as the return value of a serverless function.
 *
 * Takes care of adding `headers` and an appropriate (200) `statusCode` to the response.
 *
 * @param res A value to be `JSON.stringified` as the `body` of the result.
 * @returns `ProxyResult`
 */
export const returnFunctionSuccess = (res: unknown): ProxyResult => ({
  statusCode: 200,
  headers,
  body: JSON.stringify(res),
})

/**
 * Convert an `Error` into a response which can be returned by serverless functions.
 *
 * Takes care of adding `headers` and an appropriate (500) `statusCode` to the response.
 * The given `Error` will be used to fill-out the response's body.
 *
 * @param err The `Error` to be used as the `body` of the response
 * @returns `ProxyResult`
 */
export const returnFunctionError = (err: Error): ProxyResult => {
  const name = err.name
  const message = err.message

  return {
    statusCode: 500,
    headers,
    body: JSON.stringify({ name, message }),
  }
}
