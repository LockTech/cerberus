import type { Account } from '@prisma/client'

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
