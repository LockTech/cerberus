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

    // Whatever you want to happen to your data on new user signup. Redwood will
    // check for duplicate usernames before calling this handler. At a minimum
    // you need to save the `username`, `hashedPassword` and `salt` to your
    // user table. `userAttributes` contains any additional object members that
    // were included in the object given to the `signUp()` function you got
    // from `useAuth()`
    signupHandler: ({ username, hashedPassword, salt }) => {
      return db.user.create({
        data: {
          email: username,
          hashedPassword: hashedPassword,
          salt: salt,
          // name: userAttributes.name
        },
      })
    },

    // How long a user will remain logged in, in seconds
    loginExpires: 60 * 60 * 24, // * 365 * 10,
  })

  return authHandler.invoke()
}
