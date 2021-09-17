import { ValidationError } from 'apollo-server-errors'
import type { APIGatewayEvent, Context } from 'aws-lambda'

import { FunctionDefaultHeaders as headers } from 'src/constants/function'
import { LocaleDirectory, LocaleLookupRegEx } from 'src/constants/locales'
import { WebURL } from 'src/constants/url'

import { logger } from 'src/lib/logger'
import { returnFunctionError } from 'src/util/function'

import { readFile } from 'src/util/readFile'

const errorHelper = (error: string) =>
  returnFunctionError(new ValidationError(error))

/**
 * @throws
 *  * 'locales-origin-invalid' - When the requests originates from somewhere which is not the web-side.
 *  * 'locales-method-invalid' - When using a method other than `GET`.
 *  * 'locales-endpoint-invalid' - When the request is issued against an invalid endpoint.
 *  * 'locales-path-invalid' - When validating the requested locale file is formatted correctly.
 *  * 'locales-path-exist' - When an error occurs reading the locale from disk.
 */
export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.trace({ event, context }, 'Invoked locale function')

  if (event.headers.origin !== WebURL)
    return errorHelper('locales-origin-invalid')

  if (event.httpMethod !== 'GET') return errorHelper('locales-method-invalid')

  let path = event.path

  if (path.search('/locales/')) return errorHelper('locales-endpoint-invalid')
  path = event.path.replace('/locales/', '')

  if (path.length === 0) return errorHelper('locales-path-invalid')

  if (path.match(LocaleLookupRegEx) === null)
    return errorHelper('locales-path-invalid')

  let body: string

  try {
    body = readFile(`${LocaleDirectory}/${path}`)
  } catch (err) {
    logger.error({ err }, 'Error reading locales from disk.')
    return errorHelper('locales-path-exist')
  }

  return {
    statusCode: 200,
    headers,
    body,
  }
}
