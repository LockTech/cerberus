import { resolve } from 'path'
import { ValidationError } from '@redwoodjs/graphql-server'

import { logger } from 'src/lib/logger'
import { returnFunctionError, returnFunctionSuccess } from 'src/util/function'

import { dropPath } from 'src/util/path'
import { readFile } from 'src/util/readFile'

export const LocaleDirectory = resolve(__dirname, `../../../locales`)

export const LocaleLookupRegEx =
  /^([A-Za-z]*-?[A-Za-z]+\/[A-Za-z]*-?[A-Za-z]+).json$/

export const LocaleEndpoint = '/locales/'

const errorHelper = (error: string) =>
  returnFunctionError(new ValidationError(error))

/**
 * @throws
 *  * 'locales-method-invalid' - When using a method other than `GET`.
 *  * 'locales-path-invalid' - When validating the requested locale file is formatted correctly.
 *  * 'locales-path-exist' - When an error occurs reading the locale from disk.
 */
export const handler = async (event, context) => {
  logger.trace({ event, context }, 'Invoked locale function')

  if (event.httpMethod !== 'GET') return errorHelper('locales-method-invalid')

  const path = dropPath(event.path, LocaleEndpoint)

  logger.debug({ path }, 'Searching for locale at given path.')

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
