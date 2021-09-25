import { DbAuthHandler } from '@redwoodjs/api'
import type { GlobalContext } from '@redwoodjs/graphql-server'

import {
  authFields,
  authModelAccessor,
  loginErrors,
  loginExpires,
  signupErrors,
} from 'src/constants/auth'

import { loginHandler } from 'src/helpers/login'
import { signupHandler } from 'src/helpers/signup'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = async (event, context: GlobalContext) => {
  logger.trace('Invoking auth handler.')

  const authHandler = new DbAuthHandler(event, context, {
    db,
    authModelAccessor,
    authFields,
    signup: {
      handler: signupHandler,
      errors: signupErrors,
    },
    login: {
      handler: loginHandler,
      expires: loginExpires,
      errors: loginErrors,
    },
  })

  const res = await authHandler.invoke()

  logger.info('Successfully invoked auth handler')

  return res
}
