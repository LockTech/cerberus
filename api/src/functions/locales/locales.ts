import type { APIGatewayEvent, Context } from 'aws-lambda'
import { resolve } from 'path'

import { logger } from 'src/lib/logger'

import { returnFunctionSuccess } from 'src/util/function'
import { readFile } from 'src/util/readFile'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.trace({ event, context }, 'Invoked locale function')

  const translation = JSON.parse(
    readFile(resolve(__dirname, `../../..${event.path}`))
  )

  return returnFunctionSuccess(translation)
}
