import type { APIGatewayEvent } from 'aws-lambda'
import { DbAuthHandler } from '@redwoodjs/api'
import type { GlobalContext } from '@redwoodjs/api'

import { authFields, authModelAccessor, loginExpires } from 'src/constants/auth'

import { signupHandler } from 'src/helpers/signup'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = async (
  event: APIGatewayEvent,
  context: GlobalContext
) => {
  logger.trace('Invoking auth handler.')

  const authHandler = new DbAuthHandler(event, context, {
    db,
    authModelAccessor,
    authFields,
    signupHandler,
    loginExpires,
  })
  const res = await authHandler.invoke()

  logger.info('Successfully invoked auth handler')

  return res
}
