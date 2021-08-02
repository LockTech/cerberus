import { DbAuthHandler } from '@redwoodjs/api'

import { signupHandler } from 'src/helpers/signup'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

const loginExpires = 60 * 60 * 24 // * 365 * 10,

export const handler = async (event, context) => {
  logger.trace('Invoking auth handler.')

  const authHandler = new DbAuthHandler(event, context, {
    db,

    authModelAccessor: 'account',

    authFields: {
      id: 'id',
      username: 'email',
      hashedPassword: 'hashedPassword',
      salt: 'salt',
    },

    signupHandler,

    loginExpires,
  })

  const res = await authHandler.invoke()

  logger.info('Successfully invoked auth handler')

  return res
}
