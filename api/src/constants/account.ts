import type { Account } from '@prisma/client'

export const AccountNameMaxLength = 70

export const AccountEmailMaxLength = 254

export const AccountEmailValidRegEx =
  /^[\w-]+(?:\.[\w-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/g

/**
 * Patch function to remove sensitive fields from an `Account` object.
 *
 * Removes:
 *  * `hashedPassword`
 *  * `salt`
 *
 * TODO: Delete once Prisma issue [#7380](https://github.com/prisma/prisma/issues/7380) is merged
 */
export const AccountRemoveAuthFields = (acc: Account) => {
  if (acc) {
    delete acc.hashedPassword
    delete acc.salt
  }
  return acc
}
