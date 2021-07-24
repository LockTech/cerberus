import { DbAuthHandler } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { isStr } from 'src/util/asserters'
import { confirmAccount } from 'src/lib/confirmation'

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

    signupHandler: async ({
      hashedPassword,
      salt,
      username,
      userAttributes: { code, firstName, lastName },
    }) => {
      if (!isStr(firstName) || !isStr(lastName)) {
        logger.warn('Attempted signup without a first and last name.')
        throw new SyntaxError(
          'Cannot create an account without a first and last name.'
        )
      }

      if (!isStr(code)) {
        logger.warn('Attempted signup with a verification code.')
      }

      const options = {
        hashedPassword,
        salt,
        email: username,
        firstName,
        lastName,
      }

      return await confirmAccount({ code, ...options })
    },

    // How long a user will remain logged in, in seconds
    loginExpires: 60 * 60 * 24, // * 365 * 10,
  })

  const res = await authHandler.invoke()

  logger.info('Successfully invoked auth handler')

  return res
}
