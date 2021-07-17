import { db } from 'src/lib/db'
import { DbAuthHandler } from '@redwoodjs/api'

export const handler = async (event, context) => {
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
      // send confirmation email

      return await db.user.create({
        data: {
          email: username,
          hashedPassword: hashedPassword,
          salt: salt,
        },
      })
    },

    // How long a user will remain logged in, in seconds
    loginExpires: 60 * 60 * 24, // * 365 * 10,
  })

  return authHandler.invoke()
}
