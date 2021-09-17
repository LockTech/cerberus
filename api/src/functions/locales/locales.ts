import { ValidationError } from 'apollo-server-errors'
import type { APIGatewayEvent, Context } from 'aws-lambda'

import { LocaleDirectory, LocaleLookupRegEx } from 'src/constants/locales'

import { logger } from 'src/lib/logger'
import { returnFunctionError, returnFunctionSuccess } from 'src/util/function'

import { readFile } from 'src/util/readFile'

const errorHelper = (error: string) =>
  returnFunctionError(new ValidationError(error))

/**
 * @throws
 *  * 'locales-method-invalid' - When using a method other than `GET`.
 *  * 'locales-endpoint-invalid' - When the request is issued against an invalid endpoint.
 *  * 'locales-path-invalid' - When validating the requested locale file is formatted correctly.
 *  * 'locales-path-exist' - When an error occurs reading the locale from disk.
 */
export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.trace({ event, context }, 'Invoked locale function')

  if (event.httpMethod !== 'GET') return errorHelper('locales-method-invalid')

  let path = event.path

  if (path.search('/locales/')) return errorHelper('locales-endpoint-invalid')
  path = event.path.replace('/locales/', '')

  if (path.length === 0) return errorHelper('locales-path-invalid')

  if (path.match(LocaleLookupRegEx) === null)
    return errorHelper('locales-path-invalid')

  let body: unknown

  try {
    body = JSON.parse(readFile(`${LocaleDirectory}/${path}`))
  } catch (err) {
    logger.error({ err }, 'Error reading locales from disk.')
    return errorHelper('locales-path-exist')
  }

  logger.info('Responding to locale request.')

  return returnFunctionSuccess(body)
}
