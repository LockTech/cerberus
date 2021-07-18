import type { User } from '@prisma/client'
import { DbAuthHandler } from '@redwoodjs/api'
import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = async (event, context) => {
  logger.trace('Invoking auth handler.')

  const authHandler = new DbAuthHandler(event, context, {
    db,

    authModelAccessor: 'user',

    authFields: {
      id: 'id',
      username: 'email',
      hashedPassword: 'hashedPassword',
      salt: 'salt',
    },

    signupHandler: async ({ username, hashedPassword, salt }) => {
      logger.debug('Handling user sign up.')

      // send confirmation email

      let res: User

      try {
        res = await db.user.create({
          data: {
            email: username,
            hashedPassword,
            salt,
          },
        })
      } catch (err) {
        logger.error({ err }, 'Error adding user to database.')
        throw new ValidationError('An error occured trying to signup.')
      }

      logger.info('Successfully signed up a user.')

      return res
    },

    // How long a user will remain logged in, in seconds
    loginExpires: 60 * 60 * 24, // * 365 * 10,
  })

  return authHandler.invoke()
}
